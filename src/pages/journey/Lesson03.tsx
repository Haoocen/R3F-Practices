import React, { useRef } from "react";
import { Canvas } from "react-three-fiber";
import { Clock, Mesh } from "three";

export const Lesson03: React.FC = () => {
    const ref = useRef<Mesh>(null);
    const clock = new Clock();

    const animate = () => {
        const elasped = clock.getElapsedTime();
        if (ref.current) {
            ref.current.rotation.y = elasped;
        }

        requestAnimationFrame(animate);
    };

    animate();

    return (
        <Canvas
            colorManagement
            shadowMap
            camera={{
                fov: 45,
                position: [1, 1, 5],
            }}
        >
            <mesh ref={ref}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color={"red"} />
            </mesh>
        </Canvas>
    );
};
