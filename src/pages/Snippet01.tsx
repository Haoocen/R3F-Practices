import { Canvas, useThree } from "react-three-fiber";
import { OrbitControls } from "drei";
import { useSpring } from "react-spring/three";
import React from "react";
import { CubeTextureLoader, Vector3 } from "three";

const Box: React.FC<{
    position?: Vector3 | [x: number, y: number, z: number];
}> = (props) => {
    return (
        <mesh {...props} scale={[1, 1, 1]}>
            <boxBufferGeometry attach="geometry" args={[4, 4, 4]} />
            <meshStandardMaterial attach="material" color="orange" />
        </mesh>
    );
};
const Controls = () => {
    const { gl, camera } = useThree();

    useSpring({
        from: {
            z: -50,
        },
        to: {
            z: -10,
        },
        onChange: ({ z }: { z: number }) => {
            camera.position.z = z;
            // camera.updateProjectionMatrix()
        },
    });

    return (
        <OrbitControls
            autoRotate
            target={[0, 0, 0]}
            args={[camera, gl.domElement]}
        />
    );
};

export const Snippet01: React.FC = () => {
    return (
        <div style={{ height: "100%" }}>
            <Canvas
                colorManagement
                camera={{
                    position: [0, -2, 300],
                }}
            >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <pointLight position={[30, 10, -10]} intensity={0.5} />
                <Box position={[0, 2, 0]} />
                <Controls />
                <SkyBox />
            </Canvas>
        </div>
    );
};

const SkyBox = () => {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    scene.background = loader.load(
        [
            `${process.env.PUBLIC_URL}/assets/textures/cubemap-parliament/posx.jpg`,
            `${process.env.PUBLIC_URL}/assets/textures/cubemap-parliament/negx.jpg`,
            `${process.env.PUBLIC_URL}/assets/textures/cubemap-parliament/posy.jpg`,
            `${process.env.PUBLIC_URL}/assets/textures/cubemap-parliament/negy.jpg`,
            `${process.env.PUBLIC_URL}/assets/textures/cubemap-parliament/posz.jpg`,
            `${process.env.PUBLIC_URL}/assets/textures/cubemap-parliament/negz.jpg`,
        ],
        undefined,
        undefined,
        (e) => {
            console.log(e);
        }
    );

    return null;
};
