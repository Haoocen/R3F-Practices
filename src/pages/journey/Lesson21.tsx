import React, { Suspense, useState } from "react";
import { Canvas } from "react-three-fiber";
import { PlaneAndAxis } from "../../components/PlanAndAxis";
import { DefaultLights } from "../../components/DefaultLights";
import { Html, OrbitControls, useProgress } from "drei";
import Duck from "../../components/Objects/Duck";
import FlightHelmet from "../../components/Objects/FlightHelmet";
import Fox from "../../components/Objects/Fox";
import DatGui, { DatSelect } from "react-dat-gui";

export const Lesson21: React.FC = () => {
    const [state, setState] = useState({
        foxAnimation: "none",
    });

    const [options, setOptions] = useState<string[]>([]);

    return (
        <>
            <Canvas
                colorManagement
                shadowMap
                camera={{
                    position: [2, 2, 5],
                    near: 0.1,
                    far: 100,
                }}
            >
                <OrbitControls />
                <DefaultLights />
                <PlaneAndAxis hideAxis />
                <Suspense fallback={null}>
                    <Duck castShadow />
                </Suspense>

                <Suspense fallback={null}>
                    <Fox
                        castShadow
                        position={[-2, 0, 2]}
                        scale={[0.02, 0.02, 0.02]}
                        didLoadOptions={(names) => {
                            setOptions(["none", ...names]);
                        }}
                        selectedAnimation={state.foxAnimation}
                    />
                </Suspense>

                <group position={[2, 0, 2]} scale={[3, 3, 3]}>
                    <Suspense fallback={<Loader />}>
                        <FlightHelmet />
                    </Suspense>
                </group>
            </Canvas>
            <DatGui
                data={state}
                onUpdate={(newState) => {
                    setState(newState);
                }}
            >
                <DatSelect path="foxAnimation" options={options} />
            </DatGui>
        </>
    );
};

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}
