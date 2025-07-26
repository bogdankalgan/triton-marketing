import {useRef, useEffect} from "react";
import * as THREE from "three";
import vertexShader from "../../shaders/waveVertex.glsl";
import fragmentShader from "../../shaders/waveFragment.glsl";

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
        const mount = mountRef.current;
        mount.addEventListener('mousemove', handleMouseMove);
        return () => mount.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const mount = mountRef.current;
        const {width, height} = mount.getBoundingClientRect();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.set(0.0016908645969150383, 2.7291158701815688, 0.013446303317364051);
        camera.lookAt(0, 0, 1);



        const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        const clock = new THREE.Clock();

        const createWave = ({colorA, colorB, yOffset, zOffset, speed, opacity, amplitude, index, totalWaves, mouse}) => {
            const geometry = new THREE.PlaneGeometry(3, 6, 200, 200);

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
                    uMouse: {value: new THREE.Vector2(0.5, 0.5)},
                },
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.y = 1;
            mesh.position.z = zOffset;
            scene.add(mesh);
            meshesRef.current.push({mesh, material})

            return material;
        };

        const waves = [
            {
                colorA: [1.5, 0.3, 1.5],
                colorB: [0.2, 0.0, 0.3],
                yOffset: 0,
                zOffset: 0,
                speed: 0.8,
                opacity: 0.35,
                amplitude: 0.6,
            },
            {
                colorA: [0.3, 0.6, 1.5],
                colorB: [0.0, 0.0, 0.2],
                yOffset: 0,
                zOffset: -0.2,
                speed: 1.0,
                opacity: 0.3,
                amplitude: 0.55,
            },
            {
                colorA: [1.2, 0.0, 0.6],
                colorB: [0.3, 0.0, 0.3],
                yOffset: 0,
                zOffset: -0.4,
                speed: 1.2,
                opacity: 0.25,
                amplitude: 0.5,
            },
            {
                colorA: [0.5, 0.3, 1.2],
                colorB: [0.0, 0.0, 0.2],
                yOffset: 0,
                zOffset: -0.6,
                speed: 1.4,
                opacity: 0.2,
                amplitude: 0.45,
            },
            {
                colorA: [1.0, 0.2, 1.0],
                colorB: [0.2, 0.0, 0.2],
                yOffset: 0,
                zOffset: -0.8,
                speed: 1.6,
                opacity: 0.18,
                amplitude: 0.4,
            },
            {
                colorA: [0.6, 0.4, 1.4],
                colorB: [0.1, 0.0, 0.3],
                yOffset: 0,
                zOffset: -1.0,
                speed: 1.8,
                opacity: 0.16,
                amplitude: 0.35,
            },
            {
                colorA: [1.4, 0.1, 0.6],
                colorB: [0.2, 0.0, 0.1],
                yOffset: 0,
                zOffset: -1.2,
                speed: 2.0,
                opacity: 0.14,
                amplitude: 0.3,
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

    return <div ref={mountRef} className="absolute top-0 w-full h-[696px] z-0"></div>
}

export default AnimatedWaveBackground;