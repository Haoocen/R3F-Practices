import React from "react";
import { Canvas } from "react-three-fiber";

export const Lesson03: React.FC = () => {
    return (
        <Canvas
            colorManagement
            shadowMap
            camera={{
                fov: 45,
                position: [1, 1, 5],
            }}
        >
            <mesh castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color={"red"} />
            </mesh>
        </Canvas>
    );
};
