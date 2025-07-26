import {useRef} from "react";
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import vertexShader from "../../shaders/blokVertex.glsl";
import fragmentShader from "../../shaders/blockFragment.glsl";

export default function BlokElement() {
    const meshRef = useRef();



    useFrame(({clock}) => {
        meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime()
    })


    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1.5, 2, 1.5, 96, 96, 96]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{ uTime: { value: 0 } }}
                transparent={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}