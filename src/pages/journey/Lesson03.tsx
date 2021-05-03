import React from "react";
import { Canvas } from "react-three-fiber";

export const Lesson03: React.FC = () => {
    return (
        <Canvas
            colorManagement
            shadowMap
            camera={{
                fov: 45,
                position: [5, 1, 1],
            }}
        >
            <mesh castShadow>
                <boxGeometry attach="geometry" args={[1, 1, 1]} />
                <meshBasicMaterial attach="material" color={"red"} />
            </mesh>
        </Canvas>
    );
};
