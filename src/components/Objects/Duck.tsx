/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera } from "drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

const MODEL_PATH = `${process.env.PUBLIC_URL}/assets/objects/Duck/glTF-Draco/Duck.gltf`;

type GLTFResult = GLTF & {
    nodes: {
        LOD3spShape: THREE.Mesh;
    };
    materials: {
        ["blinn3-fx"]: THREE.MeshStandardMaterial;
    };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
    const group = useRef<THREE.Group>();
    // the second parameter makes sure we are using draco compression
    const { nodes, materials } = useGLTF(MODEL_PATH, true) as GLTFResult;
    return (
        <group ref={group} {...props} dispose={null}>
            <group scale={[0.01, 0.01, 0.01]}>
                <PerspectiveCamera
                    makeDefault={false}
                    far={10000}
                    near={1}
                    fov={37.85}
                    position={[400.11, 463.26, -431.08]}
                    rotation={[-2.31, 0.57, 2.61]}
                    scale={[1, 1, 1]}
                />
                <mesh
                    geometry={nodes.LOD3spShape.geometry}
                    material={materials["blinn3-fx"]}
                />
            </group>
        </group>
    );
}

useGLTF.preload(MODEL_PATH);