import { OrbitControls } from 'drei';
import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber'
import {Color, Mesh} from "three";

export const Example_01: React.FC = () => {
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
                <Lights/>
                <PlaneAndAxis/>
                <CubeMesh/>
                <SphereMesh/>
                <OrbitControls/>
            </Canvas>
        </>
    );
};

const PlaneAndAxis = () => {
    return (
        <>
            <mesh
                rotation={[-0.5 * Math.PI, 0, 0]}
                receiveShadow
            >
                <planeBufferGeometry attach='geometry' args={[60, 40]} />
                <shadowMaterial opacity={0.3}/>
            </mesh>
            <mesh
                rotation={[-0.5 * Math.PI, 0, 0]}
            >
                <planeBufferGeometry attach='geometry' args={[60, 40]} />
                <meshBasicMaterial attach='material' color='lightgray'/>
            </mesh>
            <axesHelper args={[20]} />

        </>
    )
}

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
            onClick={ () => {
                if (sphere.current ) {
                    sphere.current.position.x += 10
                }
            } }
        >
            <sphereGeometry attach='geometry' args={[4, 40, 40]}/>
            <meshLambertMaterial attach='material' color={new Color(0xCC3347)}/>
        </mesh>
    )
}

const Lights = () => {
    return(
        <>
            <ambientLight intensity={0.3}/>
            <spotLight
                castShadow
                position={[50, 60, 25]}
                intensity={2}
            />
            <directionalLight
                position={[0, 10, 0]}
            />
            <pointLight position={[-10, 0, -20]} intensity={0.5}/>
            <pointLight position={[0, -10, 0]} intensity={1.5}/>
        </>

    )
}
