import React, { Suspense, useCallback } from "react";
import { Canvas, useLoader } from "react-three-fiber";
import {
    BufferAttribute,
    BufferGeometry,
    PCFSoftShadowMap,
    TextureLoader,
} from "three";
import { OrbitControls } from "drei";
import { useRotation } from "../../utils/hooks/useRotation";

export const Lesson16: React.FC = () => {
    return (
        <Canvas
            colorManagement
            shadowMap
            camera={{
                fov: 75,
                position: [0, 0, 5],
                near: 0.1,
                far: 1000,
            }}
            onCreated={(state) => {
                state.gl.setClearColor(0x262837);
                state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                state.gl.shadowMap.type = PCFSoftShadowMap;
            }}
        >
            <OrbitControls />
            <Suspense fallback={null}>
                <Content />
            </Suspense>
        </Canvas>
    );
};

export const Content: React.FC = () => {
    const geoRef = useCallback((g: BufferGeometry) => {
        if (g) {
            g.setAttribute(
                "position",
                new BufferAttribute(
                    new Float32Array(2000 * 3).map(
                        () => (Math.random() - 0.5) * 10
                    ),
                    3
                )
            );
            g.setAttribute(
                "color",
                new BufferAttribute(
                    new Float32Array(5000 * 3).map(() => Math.random()),
                    3
                )
            );
        }
    }, []);

    const pointsRef = useRotation({ ySpeed: -0.5 });

    const texture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/particles/2.png`
    );

    return (
        <>
            <points ref={pointsRef}>
                {/** note that we are no longer using mesh */}
                <bufferGeometry ref={geoRef} />
                <pointsMaterial
                    args={[
                        {
                            size: 0.2,
                            sizeAttenuation: true,
                            alphaMap: texture,
                            transparent: true,
                            // alphaTest: 0.001,
                            // depthTest: false,
                            depthWrite: false,
                            vertexColors: true,
                        },
                    ]}
                />
            </points>
            <mesh>
                <boxBufferGeometry />
                <meshBasicMaterial />
            </mesh>
        </>
    );
};
