import React from "react";
import { Canvas } from "react-three-fiber";

export const Starter: React.FC = () => {
    return (
        <Canvas
            colorManagement
            shadowMap
            camera={{
                position: [2, 2, 2],
                near: 0.1,
                far: 100,
            }}
        >
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color={"red"} />
            </mesh>
        </Canvas>
    );
};
