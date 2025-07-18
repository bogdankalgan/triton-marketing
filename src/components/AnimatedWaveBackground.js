import {useRef, useEffect} from "react";
import * as THREE from "three";
import vertexShader from "../shaders/waveVertex.glsl";
import fragmentShader from "../shaders/waveFragment.glsl";

const AnimatedWaveBackground = () => {
    const mouse = useRef(new THREE.Vector2(0.5, 0.5));
    const meshesRef = useRef([]);


    const mountRef = useRef();

    const handleMouseMove = (e) => {
        const x = e.clientX / window.innerWidth;
        const y = 1.0 - e.clientY / window.innerHeight;

        mouse.current.set(x, y);

        meshesRef.current.forEach(mesh => {
            mesh.material.uniforms.uMouse.value = mouse.current;
        })
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const mount = mountRef.current;
        const {width, height} = mount.getBoundingClientRect();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width/height, 0.1, 1000);
        camera.position.z = 3;
        camera.position.y = -0.5

        const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        const clock = new THREE.Clock();

        const createWave = ({colorA, colorB, yOffset, zOffset, speed, opacity, amplitude, index, totalWaves, mouse}) => {
            const geometry = new THREE.PlaneGeometry(100, 2, 2000, 1);

            const material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    uTime: {value: 0},
                    uColorA: {value: new THREE.Color(...colorA)},
                    uColorB: {value: new THREE.Color(...colorB)},
                    uSpeed: {value: speed},
                    uOpacity: {value: opacity},
                    uAmplitude: {value: amplitude},
                    uResolution: {value: new THREE.Vector2(width, height)},
                    uOffset: {value: Math.random() * 10},
                    uIndex: {value: index / totalWaves},
                    uMouse: {value: new THREE.Vector2(0.5, 0,5)},
                },
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = yOffset;
            mesh.position.z = zOffset;
            scene.add(mesh);
            meshesRef.current.push({mesh, material})

            return material;
        };

        const waves = [
            {
                colorA: [0.8, 0.2, 0.6],
                colorB: [0.1, 0.0, 0.3],
                yOffset: 0,
                zOffset: 0,
                speed: 0.1,
                opacity: 0.5,
                amplitude: 0.6,
            },
            {
                colorA: [0.3, 0.8, 1.0],
                colorB: [0.0, 0.0, 0.2],
                yOffset: 0.05,
                zOffset: -0.1,
                speed: 0.2,
                opacity: 0.2,
                amplitude: 0.15,
            },
            {
                colorA: [0.5, 0.0, 0.6],
                colorB: [0.2, 0.0, 0.3],
                yOffset: -0.05,
                zOffset: -0.2,
                speed: 0.4,
                opacity: 0.15,
                amplitude: 0.1,
            },
            {
                colorA: [0.1, 0.4, 0.8],
                colorB: [0.0, 0.0, 0.2],
                yOffset: 0.08,
                zOffset: -0.3,
                speed: 0.5,
                opacity: 0.15,
                amplitude: 0.25,
            },
            {
                colorA: [0.7, 0.2, 0.6],
                colorB: [0.1, 0.0, 0.2],
                yOffset: -0.08,
                zOffset: -0.4,
                speed: 0.6,
                opacity: 0.1,
                amplitude: 0.2,
            },
        ];

        const materials = waves.map((config, index) => createWave({
            ...config,
            index,
            totalWaves: waves.length,
            mouse,
        }));

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsed =  clock.getElapsedTime()
            materials.forEach(material => {
                material.uniforms.uTime.value = elapsed;
            })
            renderer.render(scene, camera);
        }

        animate()


        const handleResize = () => {
            const {width, height} = mount.getBoundingClientRect();
            renderer.setSize(window.innerWidth, window.innerHeight)
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            materials.forEach(material => {
                material.uniforms.uResolution.value = new THREE.Vector2(width, height);
            })
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            mount.removeChild(renderer.domElement);
        }
    }, []);


    return <div ref={mountRef} className="absolute inset-0 -top-[30px] w-full h-[700px] z-0"></div>
}

export default AnimatedWaveBackground;