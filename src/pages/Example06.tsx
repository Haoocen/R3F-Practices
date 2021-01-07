import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { DefaultLights } from "../components/DefaultLights";
import Chick from "../components/Objects/Chick";
import { Html, OrbitControls, useProgress } from "drei";
import { PlaneAndAxis } from "../components/PlanAndAxis";

export const Example06: React.FC = () => {
    return (
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
            <group position={[0, -10, 0]}>
                <Suspense fallback={<Loader />}>
                    <Chick position={[-20, 8, 0]} scale={[4, 4, 4]} />
                    <PlaneAndAxis hideAxis />
                </Suspense>
            </group>
            <DefaultLights />
            <OrbitControls />
        </Canvas>
    );
};

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}
