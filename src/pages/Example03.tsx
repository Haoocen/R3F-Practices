import React from "react";
import {Canvas} from "react-three-fiber";
import {OrbitControls} from "drei";
import {PlaneAndAxis} from "../components/PlanAndAxis";
import {DefaultLights} from "../components/DefaultLights";

export const Example03: React.FC = () => {
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
                <OrbitControls/>
                <PlaneAndAxis/>
            </Canvas>
        </>
    );
};