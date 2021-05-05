import { Switch, Typography } from "@material-ui/core";
import { Html, OrbitControls } from "drei";
import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { TextureLoader, Mesh, NearestFilter, LinearFilter } from "three";

export const Lesson11: React.FC = () => {
    const ref = useRef<Mesh>(null);
    const loader = new TextureLoader();
    const texture = loader.load(
        `${process.env.PUBLIC_URL}/assets/textures/door/color.jpg`
    );

    const dimondTexture = loader.load(
        `${process.env.PUBLIC_URL}/assets/textures/minecraft.png`
    );

    const [f, setF] = useState(false);

    useEffect(() => {
        dimondTexture.magFilter = f ? NearestFilter : LinearFilter;
    }, [f]);

    return (
        <Canvas
            colorManagement
            shadowMap
            camera={{
                fov: 45,
                position: [1, 1, 5],
            }}
        >
            <OrbitControls />
            <mesh ref={ref}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial map={texture} />
            </mesh>
            <mesh ref={ref} position={[2, 0, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial map={dimondTexture} />
            </mesh>
            <Html position={[2, 1, 0]}>
                <Typography>magFilter == NearestFilter?</Typography>
                <Switch
                    checked={f}
                    onChange={(e, v) => {
                        setF(v);
                    }}
                />
            </Html>
        </Canvas>
    );
};
