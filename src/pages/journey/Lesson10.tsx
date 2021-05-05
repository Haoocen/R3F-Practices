import React, { useRef, useState } from "react";
import { Canvas } from "react-three-fiber";
import { Mesh } from "three";
import DatGui, {
    DatBoolean,
    DatColor,
    DatNumber,
    DatString,
} from "react-dat-gui";
import "react-dat-gui/dist/index.css";
import { DefaultLights } from "../../components/DefaultLights";
import { OrbitControls, Text } from "drei";

interface IState {
    color: string;
    num: number;
    orbitControls: boolean;
    package: string;
}

export const Lesson10: React.FC = () => {
    const ref = useRef<Mesh>(null);

    const [state, setState] = useState<IState | null>({
        color: "red",
        num: 0,
        orbitControls: false,
        package: "what",
    });

    return (
        <>
            <Canvas
                colorManagement
                shadowMap
                camera={{
                    fov: 45,
                    position: [1, 1, 5],
                }}
                style={{
                    position: "absolute",
                }}
            >
                {state?.orbitControls ? <OrbitControls /> : null}
                <DefaultLights />
                <mesh ref={ref}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhongMaterial color={state?.color ?? "red"} />
                </mesh>
                <Text
                    position={[0, 1, 1]}
                    color="black"
                    fontSize={0.5}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={0.02}
                    textAlign={"left"}
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    anchorX="center"
                    anchorY="middle"
                >
                    {state?.package ?? "hello"}
                </Text>
                <Text
                    position={[0, -1, 1]}
                    color="black"
                    fontSize={0.5}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={0.02}
                    textAlign={"left"}
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    anchorX="center"
                    anchorY="middle"
                >
                    num: {state?.num}
                </Text>
            </Canvas>

            <DatGui
                data={state}
                onUpdate={(newState) => {
                    setState(newState);
                }}
            >
                <DatString path="package" label="Package" />
                <DatNumber path="num" label="num" min={-10} max={10} step={1} />
                <DatBoolean path="orbitControls" label="Orbit Control" />
                <DatColor path="color" label="Color" />
            </DatGui>
        </>
    );
};
