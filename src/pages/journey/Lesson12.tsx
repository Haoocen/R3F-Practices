import { OrbitControls } from "drei";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import {
    DoubleSide,
    Material,
    Mesh,
    MeshBasicMaterial,
    MeshDepthMaterial,
    MeshLambertMaterial,
    MeshMatcapMaterial,
    MeshNormalMaterial,
    MeshPhongMaterial,
    MeshStandardMaterial,
    MeshToonMaterial,
    TextureLoader,
} from "three";
import { DefaultLights } from "../../components/DefaultLights";
import DatGui, { DatSelect, DatNumber, DatBoolean } from "react-dat-gui";
import "react-dat-gui/dist/index.css";
import { isUndefined } from "lodash";

interface IProps {
    material: Material;
    opacity: number;
    double_sided: boolean;
    metalness?: number;
    roughness?: number;
}

const Content: React.FC<IProps> = ({
    material,
    opacity,
    double_sided,
    metalness,
    roughness,
}) => {
    const square = useRef<Mesh>(null);
    const donut = useRef<Mesh>(null);
    const plane = useRef<Mesh>(null);

    useFrame(() => {
        if (donut.current) {
            donut.current.rotation.y += 0.01;
            donut.current.rotation.x += 0.01;
        }

        if (square.current) {
            square.current.rotation.y -= 0.01;
            square.current.rotation.x += 0.01;
        }

        if (plane.current) {
            plane.current.rotation.z += 0.02;
        }
    });

    material.opacity = opacity;
    material.transparent = material.transparent || opacity < 1;
    if (double_sided) {
        material.side = DoubleSide;
    }

    if (!isUndefined(metalness)) {
        (material as MeshStandardMaterial).metalness = metalness;
    }

    if (!isUndefined(roughness)) {
        (material as MeshStandardMaterial).roughness = roughness;
    }

    return (
        <>
            <DefaultLights />
            <OrbitControls />
            <mesh ref={square} material={material} position={[-1.5, 0, 0]}>
                <sphereGeometry args={[0.5, 16, 16]} />
            </mesh>
            <mesh ref={donut} material={material} position={[1.5, 0, 0]}>
                <torusGeometry args={[0.3, 0.2, 32, 64]} />
            </mesh>
            <mesh ref={plane} material={material}>
                <planeGeometry args={[1, 1, 64, 64]} />
            </mesh>
        </>
    );
};

export const Lesson12: React.FC = () => {
    /// load textures
    const textureLoader = new TextureLoader();

    const doorColorTexture = textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/textures/door/color.jpg`
    );
    const doorAlphaTexture = textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/textures/door/alpha.jpg`
    );
    const matcapTexture = textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/textures/matcaps/8.png`
    );
    const doorHeightTexture = textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/textures/door/height.jpg`
    );
    const doorNormalTexture = textureLoader.load(
        `${process.env.PUBLIC_URL}/assets/textures/door/normal.jpg`
    );

    const materialMap: { [key: string]: Material } = {
        basic: new MeshBasicMaterial(),
        colored_door: new MeshBasicMaterial({ map: doorColorTexture }),
        red_door: new MeshBasicMaterial({
            color: 0xff0011,
            map: doorColorTexture,
        }),
        alpha_color_door: new MeshBasicMaterial({
            alphaMap: doorAlphaTexture,
            map: doorColorTexture,
            transparent: true,
        }),
        wireframe: new MeshBasicMaterial({
            color: "green",
            wireframe: true,
        }),
        normal_material: new MeshNormalMaterial({
            flatShading: true,
        }),
        matcap: new MeshMatcapMaterial({
            matcap: matcapTexture,
        }),
        depth: new MeshDepthMaterial(),
        lambert: new MeshLambertMaterial({
            color: "lightblue",
        }),
        phong: new MeshPhongMaterial({
            color: "lightblue",
        }),
        toon: new MeshToonMaterial({
            color: "blue",
        }),
        standard: new MeshStandardMaterial(),
        displacement_map: new MeshStandardMaterial({
            map: doorColorTexture,
            displacementMap: doorHeightTexture,
            displacementScale: 0.1,
        }),
        displacement_map_wireframe: new MeshStandardMaterial({
            map: doorColorTexture,
            displacementMap: doorHeightTexture,
            wireframe: true,
            displacementScale: 0.1,
        }),
        disp_and_normal: new MeshStandardMaterial({
            map: doorColorTexture,
            displacementMap: doorHeightTexture,
            normalMap: doorNormalTexture,
            displacementScale: 0.1,
        }),
        disp_and_normal_and_alpha: new MeshStandardMaterial({
            map: doorColorTexture,
            displacementMap: doorHeightTexture,
            normalMap: doorNormalTexture,
            displacementScale: 0.1,
            alphaMap: doorAlphaTexture,
        }),
    };

    /// DatUI states
    const [state, setState] = useState({
        material: "colored_door",
        opacity: 1,
        double_sided: false,
        metalness: 0,
        roughness: 0,
    });

    return (
        <>
            <Canvas
                colorManagement
                shadowMap
                camera={{
                    fov: 45,
                    position: [0, 0, 6],
                }}
            >
                <Content
                    material={materialMap[state.material]}
                    opacity={state.opacity}
                    double_sided={state.double_sided}
                    metalness={
                        materialMap[state.material] instanceof
                        MeshStandardMaterial
                            ? state.metalness
                            : undefined
                    }
                    roughness={
                        materialMap[state.material] instanceof
                        MeshStandardMaterial
                            ? state.roughness
                            : undefined
                    }
                />
            </Canvas>
            <DatGui
                data={state}
                onUpdate={(newState) => {
                    setState(newState);
                }}
            >
                <DatSelect path="material" options={Object.keys(materialMap)} />
                <DatNumber
                    path="opacity"
                    label="opacity"
                    min={0}
                    max={1}
                    step={0.1}
                />
                <DatBoolean path="double_sided" label="double_sided" />
                <DatNumber
                    path="metalness"
                    label="metalness"
                    min={0}
                    max={1}
                    step={0.1}
                />
                <DatNumber
                    path="roughness"
                    label="roughness"
                    min={0}
                    max={1}
                    step={0.1}
                />
            </DatGui>
        </>
    );
};
