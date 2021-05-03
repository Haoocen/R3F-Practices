/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrbitControls, useGLTF } from "drei";
import { Canvas, GroupProps, PrimitiveProps } from "react-three-fiber";
import React, { Suspense, useMemo, useState } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { PlaneAndAxis } from "./PlanAndAxis";

const MODEL_PATH = `${process.env.PUBLIC_URL}/assets/objects/Character.gltf`;

export const MyCharacter = () => {
    return (
        <Canvas
            camera={{
                position: [0, 0, -20],
            }}
        >
            <Suspense fallback={null}>
                <ambientLight />
                <pointLight position={[10, 30, 10]} />
                <pointLight position={[10, 30, -10]} />
                <mesh>
                    <Model path={MODEL_PATH} position={[0, 5, -15]} />
                </mesh>
                <OrbitControls />
                {/*<PlaneAndAxis />*/}
            </Suspense>
        </Canvas>
    );
};
//
// const Model: React.FC<GroupProps> = (props) => {
//     const [gltf, set] = useState<GLTF | undefined>(undefined);
//     useMemo(() => new GLTFLoader().load(MODEL_PATH, set), [MODEL_PATH]);
//     return gltf ? <primitive {...props} object={gltf.scene} /> : null;
// };

const Model: React.FC<{ path: string } & Omit<PrimitiveProps, "object">> = ({
    path,
    ...rest
}) => {
    const gltf = useGLTF(path, true);
    return <primitive {...rest} object={gltf.scene} dispose={null} />;
};
