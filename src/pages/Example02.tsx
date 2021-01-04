import {OrbitControls} from 'drei';
import React, {useEffect, useRef} from 'react';
import {Canvas, useFrame} from 'react-three-fiber'
import {Color, Face3, Geometry, Mesh, MeshBasicMaterial, MeshLambertMaterial, Vector3} from "three";
import {range} from 'lodash';
import {DefaultLights} from "../components/DefaultLights";
import {PlaneAndAxis} from "../components/PlanAndAxis";
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
                <DefaultLights/>
                <PlaneAndAxis/>
                <OrbitControls/>
                {
                    range(10).map((i: number) =>
                        <RandomCube key={i}/>
                    )
                }
                <SimpleDiamond/>
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

const SimpleDiamond = () => {
    const ref = useRef<Geometry>(null)
    const meshRef = useRef<Mesh>(null)

    const materials = [
        new MeshLambertMaterial({opacity: 0.6, color: 0x44ff44, transparent: true}),
        new MeshBasicMaterial({color: 0x000000, wireframe: true})

    ];

    /**
     * Is this the correct way???
     */
    useEffect(() => {
        if (ref.current) {
            ref.current.computeFaceNormals()
        }
    })

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01
        }
    })

    const h = 4 * Math.sin(Math.PI / 3)
    const w = 2

    const vertices = [
        new Vector3(-4,4,0),
        new Vector3(-w,4,h),
        new Vector3(w,4,h),
        new Vector3(4,4,0),
        new Vector3(w,4,-h),
        new Vector3(-w,4,-h),
        new Vector3(0,4,0),
        new Vector3(0,0,0),
    ];

    const faces = [
        new Face3(0,1,6),
        new Face3(1,2,6),
        new Face3(2,3,6),
        new Face3(3,4,6),
        new Face3(4,5,6),
        new Face3(5,0,6),
        new Face3(0,1,7),
        new Face3(1,2,7),
        new Face3(2,3,7),
        new Face3(3,4,7),
        new Face3(4,5,7),
        new Face3(5,0,7),
    ];

    return (
            <mesh
                ref={meshRef}
                castShadow
                position={[0, 5, 0]}
                material={materials}
            >
                <geometry ref={ref} attach="geometry" vertices={vertices} faces={faces}/>
                {/*<meshPhongMaterial attachArray='material' color='lightblue'/>*/}
            </mesh>
    )
}
