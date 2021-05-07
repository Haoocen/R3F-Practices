import { OrbitControls } from "drei";
import React, { Suspense, useCallback, useMemo } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import {
    FontLoader,
    MeshMatcapMaterial,
    TextGeometry,
    TextGeometryParameters,
    TextureLoader,
    TorusGeometry,
} from "three";
import { DefaultLights } from "../../components/DefaultLights";

export const Lesson13: React.FC = () => {
    return (
        <Suspense fallback={null}>
            <Content />
        </Suspense>
    );
};

const Content: React.FC = () => {
    const font = useLoader(
        FontLoader,
        `${process.env.PUBLIC_URL}/assets/fonts/helvetiker_regular.typeface.json`
    );
    const textOptions: TextGeometryParameters = useMemo(
        () => ({
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 8,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelOffset: 0,
            bevelSize: 0.05,
            bevelSegments: 4,
        }),
        [font]
    );

    /// use bounding boxes to center the text
    // const mesh = useCallback((mesh: Mesh) => {
    //     if (mesh) {
    //         const size = new Vector3();
    //         mesh.geometry.computeBoundingBox();
    //         mesh.geometry.boundingBox?.getSize(size);
    //         mesh.position.x = -size.x / 2;
    //         mesh.position.y = -size.y / 2;
    //         mesh.position.z = -size.z / 2;
    //     }
    // }, []);

    const geoRef = useCallback((geo: TextGeometry) => {
        if (geo) {
            geo.center();
        }
    }, []);

    const matcapTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/matcaps/8.png`
    );

    // optimize the performance of creating 100 of the donuts...
    const donutGeometry = new TorusGeometry(0.15, 0.1, 20, 45);
    const donutMaterial = new MeshMatcapMaterial({ matcap: matcapTexture });

    return (
        <Canvas
            colorManagement
            shadowMap
            camera={{
                fov: 45,
                position: [1, 1, 5],
            }}
        >
            <DefaultLights />
            <OrbitControls />
            {/* <axesHelper /> */}
            <mesh /*ref={mesh}*/>
                <textGeometry
                    ref={geoRef}
                    attach="geometry"
                    args={["Hello World", textOptions]}
                />
                {/* <meshMatcapMaterial color="lightblue" matcap={matcapTexture} /> */}
                <primitive object={donutMaterial} attach="material" />
            </mesh>
            {[...Array(100)].map((_, i) => (
                <Donut
                    key={i}
                    position={[
                        Math.random() * 8 - 4,
                        Math.random() * 8 - 4,
                        Math.random() * 8 - 4,
                    ]}
                    rotation={[
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                        Math.random() * Math.PI,
                    ]}
                    scale={0.5 + 0.5 * Math.random()}
                >
                    <primitive object={donutGeometry} attach="geometry" />
                    <primitive object={donutMaterial} attach="material" />
                    {/* <torusGeometry args={[0.15, 0.1, 20, 45]} />
                    <meshMatcapMaterial color="lightblue" matcap={matcapTexture}/> */}
                </Donut>
            ))}
        </Canvas>
    );
};

interface IDonutProps {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
}

const Donut: React.FC<IDonutProps> = ({
    position,
    rotation,
    scale,
    children,
}) => {
    return (
        <mesh
            position={position}
            rotation={rotation}
            scale={[scale, scale, scale]}
        >
            {children}
        </mesh>
    );
};
