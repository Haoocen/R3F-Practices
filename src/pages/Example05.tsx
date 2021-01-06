import { Html, OrbitControls } from "drei";
import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "react-three-fiber";
import { Color, MeshNormalMaterial } from "three";
import { Switch, Typography } from "@material-ui/core";
import { DefaultLights } from "../components/DefaultLights";
import { PlaneAndAxis } from "../components/PlanAndAxis";

export const Example05: React.FC = () => {
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
                <DefaultLights />
                <PlaneAndAxis hideAxis />
                <OrbitControls />
                <BasicCubes />
                <FaceCube />
                <NormalCubes />
                <LambertCube />
                <PhongCube />
            </Canvas>
        </>
    );
};

const BasicCubes = () => {
    return (
        <>
            <group position={[0, 2, -8]}>
                <Html position={[-1, 0, 0]}>Basic transparent</Html>
                <mesh>
                    <sphereBufferGeometry args={[2, 40, 40]} />
                    <meshBasicMaterial
                        color={new Color(0x777ff)}
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            </group>
            <group position={[0, 2, 0]}>
                <Html position={[-1, 0, 0]}>Basic</Html>
                <mesh>
                    <sphereBufferGeometry args={[2, 40, 40]} />
                    <meshBasicMaterial color={new Color(0x777ff)} />
                </mesh>
            </group>
            <group position={[0, 2, 8]}>
                <Html position={[-1, 0, 0]}>Basic wireframe</Html>
                <mesh>
                    <sphereBufferGeometry args={[2, 10, 10]} />
                    <meshBasicMaterial
                        color={new Color(0)}
                        wireframe
                        opacity={0.2}
                        transparent
                    />
                </mesh>
            </group>
            <group position={[0, 2, 16]}>
                <Html position={[-1, 0, 0]}>Basic</Html>
                <mesh>
                    <sphereBufferGeometry args={[2, 40, 40]} />
                    <meshBasicMaterial color={new Color(0x777ff)} />
                </mesh>
            </group>
        </>
    );
};

const NormalCubes = () => {
    const [flat, setFlat] = useState(true);
    const handleChange = (_: React.ChangeEvent, value: boolean) => {
        setFlat(value);
    };

    const ref = useRef<MeshNormalMaterial>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.flatShading = flat;
            ref.current.needsUpdate = true;
        }
    }, [flat]);

    return (
        <>
            <group position={[16, 8, -8]}>
                <Html position={[-1, 0, 0]}>
                    <Typography variant="h5"> Normal </Typography>
                    <Typography>flat shading</Typography>{" "}
                    <Switch checked={flat} onChange={handleChange} />
                </Html>
                <mesh>
                    <sphereBufferGeometry args={[8, 16, 16]} />
                    <meshNormalMaterial color={new Color(0x777ff)} ref={ref} />
                </mesh>
            </group>
        </>
    );
};

const FaceCube = () => {
    return (
        <>
            <group position={[-8, 2, 0]}>
                <Html position={[-1, 0, 0]}>
                    <Typography variant="h5"> Faces </Typography>
                </Html>
                <mesh>
                    <boxBufferGeometry attach="geometry" args={[4, 4, 4]} />
                    <meshBasicMaterial
                        attachArray="material"
                        color={new Color(0x765aaa)}
                    />
                    <meshBasicMaterial attachArray="material" color="green" />
                    <meshBasicMaterial attachArray="material" color="blue" />
                    <meshBasicMaterial attachArray="material" color="cyan" />
                    <meshBasicMaterial attachArray="material" color="magenta" />
                    <meshBasicMaterial attachArray="material" color="yellow" />
                </mesh>
            </group>
        </>
    );
};

const LambertCube = () => {
    return (
        <>
            <group position={[-20, 4, -8]}>
                <Html position={[-1, 0, 0]}>
                    <Typography variant="h5"> Lambert</Typography>
                </Html>
                <mesh>
                    <sphereBufferGeometry
                        attach="geometry"
                        args={[4, 30, 30]}
                    />
                    <meshLambertMaterial attach="material" color="hotpink" />
                </mesh>
            </group>
        </>
    );
};

const PhongCube = () => {
    return (
        <>
            <group position={[-20, 4, 8]}>
                <Html position={[-1, 0, 0]}>
                    <Typography variant="h5"> Phong </Typography>
                </Html>
                <mesh>
                    <sphereBufferGeometry
                        attach="geometry"
                        args={[4, 30, 30]}
                    />
                    <meshPhongMaterial attach="material" color="hotpink" />
                </mesh>
            </group>
        </>
    );
};
