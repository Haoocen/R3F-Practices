import {OrbitControls} from 'drei';
import React from 'react';
import { Canvas } from 'react-three-fiber'
import {Color, Face3, Vector3} from "three";
import {range} from 'lodash';
/**
 * Working with Basic components and objects
 */
export const Example02: React.FC = () => {
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
                <Plane/>
                <OrbitControls/>
                {
                    range(10).map((i: number) =>
                        <RandomCube key={i}/>
                    )
                }
                <GeometryOne/>
                <Fog/>
            </Canvas>
        </>
    );
};

const RandomCube = () => {
    const cubeSize = Math.ceil(Math.random() * 3)
    const cubeColor = new Color(0xffffff * Math.random())
    return (
        <mesh
            position={[
                Math.round(-25 + Math.random() * 50),
                Math.round(2),
                Math.round(-15 + Math.random() * 30)
            ]}
            castShadow
        >
            <boxGeometry attach='geometry' args={[cubeSize, cubeSize, cubeSize]}/>
            <meshLambertMaterial attach='material' color={cubeColor}/>
        </mesh>
    )
}

const GeometryOne = () => {
    const vertices = [
        new Vector3(4,0,1),
        new Vector3(4,0,-1),
        new Vector3(1,0,1),
        new Vector3(1,0,-1),
        new Vector3(-1,3,-1),
        new Vector3(-1,3,1),
        new Vector3(-1,0,-1),
        new Vector3(-1,0,1)
    ];

    const faces = [
        new Face3(0,2,1),
        new Face3(2,3,1),
        new Face3(4,6,5),
        new Face3(6,7,5),
        new Face3(4,5,1),
        new Face3(5,0,1),
        new Face3(7,6,2),
        new Face3(6,3,2),
        new Face3(5,7,0),
        new Face3(7,2,0),
        new Face3(1,3,4),
        new Face3(3,6,4),
    ];

    return (
        <group
            castShadow
            position={[0, 10, 0]}
        >
            <mesh

            >
                <geometry attach="geometry" vertices={vertices} faces={faces}/>
                <meshBasicMaterial attachArray='material' color='gray' />
                {/*<meshLambertMaterial attachArray='material' color='gray' transparent/>*/}
            </mesh>

        </group>
    )
}

const Fog = () => {
    return (
        <fog name='fog' color={new Color(0xFFFFFF)} near={0.015} far={500}/>
    )
}

const Plane = () => {
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
                <meshLambertMaterial attach='material' color='white'/>
            </mesh>
        </>
    )
}

const Lights = () => {
    return (
        <>
            <spotLight
                castShadow
                position={[50, 60, 25]}
                intensity={2}
            />
            <ambientLight color={new Color(0x0c0c0c)}/>
            <spotLight color='white'/>
            <pointLight position={[-10, 0, -20]} intensity={0.5}/>
            <pointLight position={[0, -10, 0]} intensity={1.5}/>
        </>
    )
}