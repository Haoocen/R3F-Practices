import { OrbitControls } from 'drei';
import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber'
import {Color, Mesh} from "three";
import { DefaultLights } from '../components/DefaultLights';
import {PlaneAndAxis} from "../components/PlanAndAxis";

export const Example01: React.FC = () => {
    return (
        <>
            <Canvas
                colorManagement
                shadowMap
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 1000,
                    position: [10, 35, 50],
                }}
            >
                <DefaultLights/>
                <PlaneAndAxis/>
                <CubeMesh/>
                <SphereMesh/>
                <OrbitControls/>
            </Canvas>
        </>
    );
};


const CubeMesh = () => {
    const cube = useRef<Mesh>(null)
    return (
        <mesh
            ref={cube}
            position={[-14, 2, 0]}
            castShadow
        >
            <boxGeometry attach='geometry' args={[8,4,8]}/>
            <meshLambertMaterial attach='material' color={new Color(0x33BECC)}/>
        </mesh>
    )
}

const SphereMesh = () => {
    const sphere = useRef<Mesh>(null)

    let step = 0

    useFrame(() => {
        if (sphere.current) {
            step += 0.05
            sphere.current.position.y = 3 + ( 15 * Math.abs(Math.sin(step)));
            sphere.current.position.x = 20 + 5 * Math.cos(step)
        }
    })

    return (
        <mesh
            ref={sphere}
            position={[20, 4, 2]}
            castShadow
        >
            <sphereGeometry attach='geometry' args={[4, 40, 40]}/>
            <meshLambertMaterial attach='material' color={new Color(0xCC3347)}/>
        </mesh>
    )
}
