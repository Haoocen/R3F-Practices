import { OrbitControls } from "drei";
import React, { Suspense, useCallback, useRef } from "react";
import { Canvas, GroupProps, useFrame, useLoader } from "react-three-fiber";
import {
    BoxBufferGeometry,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    PCFSoftShadowMap,
    PointLight,
    RepeatWrapping,
    SphereBufferGeometry,
    TextureLoader,
} from "three";
import { useUv2 } from "../../utils/hooks/useUv2";

export const Lesson15: React.FC = () => {
    return (
        <Canvas
            camera={{
                fov: 75,
                position: [4, 2, 5],
                far: 100,
                near: 0.1,
            }}
            onCreated={(state) => {
                state.gl.setClearColor(0x262837);
                state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                state.gl.shadowMap.type = PCFSoftShadowMap;
            }}
            shadowMap
        >
            <OrbitControls zoomSpeed={0.5} />
            <Lights />
            <fog attach="fog" args={[0x262837, 1, 20]} />
            <House position={[0, 0, 0]} />
            <Graves />
            <Ghosts />
            <Suspense fallback={null}>
                <Floor />
            </Suspense>
        </Canvas>
    );
};

// =========================================================================
// House
// =========================================================================
const House: React.FC<GroupProps> = (props) => {
    return (
        <group {...props}>
            <Suspense fallback={null}>
                <Walls />
                <Roof />
                <Door />
                <Bushes />
            </Suspense>
        </group>
    );
};

const Walls: React.FC = () => {
    const colorTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/bricks/color.jpg`
    );
    const roughnessTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/bricks/roughness.jpg`
    );
    const aoTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/bricks/ambientOcclusion.jpg`
    );
    const normalTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/bricks/normal.jpg`
    );

    const geoRef = useUv2();

    return (
        <mesh position={[0, 2.5 / 2, 0]}>
            <boxBufferGeometry args={[4, 2.5, 4]} ref={geoRef} />
            <meshStandardMaterial
                args={[
                    {
                        map: colorTexture,
                        aoMap: aoTexture,
                        normalMap: normalTexture,
                        roughnessMap: roughnessTexture,
                    },
                ]}
            />
        </mesh>
    );
};

const Roof: React.FC = () => {
    return (
        <mesh position={[0, 3.5, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneBufferGeometry args={[3.5, 2, 4]} />
            <meshStandardMaterial color={0xb35f45} />
        </mesh>
    );
};

const Door: React.FC = () => {
    const colorTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/door/color.jpg`
    );
    const alphaTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/door/alpha.jpg`
    );
    const aoTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/door/ambientOcclusion.jpg`
    );
    const normalTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/door/normal.jpg`
    );
    const metalnessTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/door/metalness.jpg`
    );
    const roughnessTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/door/roughness.jpg`
    );
    const heightTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/door/height.jpg`
    );

    // add uv2 coordinates to use aoMap
    const geoRef = useUv2();

    const doorLight = useRef<PointLight>(null);

    useFrame(({ clock }) => {
        if (doorLight.current) {
            const elapsed = clock.getElapsedTime() * 0.5;
            if (Math.sin(elapsed) > 0.98) {
                doorLight.current.intensity = Math.random();
            } else {
                doorLight.current.intensity = 1;
            }
        }
    });

    return (
        <>
            <pointLight
                ref={doorLight}
                position={[0, 2.2, 2.6]}
                color={0xff7d46}
                intensity={1}
                distance={8}
                castShadow
            />
            <mesh position={[0, 1, 2.01]}>
                <planeBufferGeometry ref={geoRef} args={[2.2, 2.2, 100, 100]} />
                <meshStandardMaterial
                    transparent
                    args={[
                        {
                            map: colorTexture,
                            alphaMap: alphaTexture,
                            aoMap: aoTexture,
                            displacementMap: heightTexture,
                            displacementScale: 0.1,
                            normalMap: normalTexture,
                            metalnessMap: metalnessTexture,
                            roughnessMap: roughnessTexture,
                        },
                    ]}
                />
            </mesh>
        </>
    );
};

// =========================================================================
// Graves
// =========================================================================
const Graves: React.FC = () => {
    const geometry = new BoxBufferGeometry(0.6, 0.8, 0.2);
    const material = new MeshStandardMaterial({ color: 0xb2b6b1 });

    return (
        <group>
            {[...Array(50)].map((_, i) => {
                const angle = Math.random() * Math.PI * 2;
                const x = Math.sin(angle);
                const z = Math.cos(angle);
                const dist = 3 + Math.random() * 6;
                return (
                    <mesh
                        castShadow
                        key={i}
                        geometry={geometry}
                        material={material}
                        position={[x * dist, 0.3, z * dist]}
                        rotation={[
                            0,
                            (Math.random() - 0.5) * 0.4,
                            (Math.random() - 0.5) * 0.4,
                        ]}
                    />
                );
            })}
        </group>
    );
};

// =========================================================================
// Bushes
// =========================================================================
const Bushes: React.FC = () => {
    const geometry = new SphereBufferGeometry(1, 16, 16);
    const material = new MeshStandardMaterial({ color: 0x89c854 });
    return (
        <group>
            <mesh
                scale={[0.5, 0.5, 0.5]}
                position={[0.8, 0.2, 2.2]}
                geometry={geometry}
                material={material}
                castShadow
            />
            <mesh
                scale={[0.25, 0.25, 0.25]}
                position={[1.4, 0.1, 2.1]}
                geometry={geometry}
                material={material}
                castShadow
            />
            <mesh
                scale={[0.4, 0.4, 0.4]}
                position={[-0.8, 0.1, 2.2]}
                geometry={geometry}
                material={material}
                castShadow
            />
            <mesh
                scale={[0.2, 0.2, 0.2]}
                position={[-1.2, 0.05, 2.4]}
                geometry={geometry}
                material={material}
                castShadow
            />
            <mesh
                scale={[0.15, 0.15, 0.15]}
                position={[-1, 0.05, 2.6]}
                geometry={geometry}
                material={material}
                castShadow
            />
        </group>
    );
};

// =========================================================================
// Ghosts
// =========================================================================
const Ghosts: React.FC = () => {
    const ghost1 = useRef<Mesh>(null);
    const ghost2 = useRef<Mesh>(null);
    const ghost3 = useRef<Mesh>(null);
    const rand1 = Math.random();

    useFrame(({ clock }) => {
        const elapsed = clock.getElapsedTime();

        if (ghost1.current) {
            ghost1.current.position.set(
                Math.cos(elapsed) * 5 + Math.sin(elapsed) * rand1,
                Math.sin(elapsed) * 2,
                Math.sin(elapsed) * 5
            );
        }

        if (ghost2.current) {
            const angle = elapsed * 0.5;
            ghost2.current.position.set(
                Math.sin(angle) * 6,
                Math.sin(angle * 4),
                Math.cos(angle) * 6
            );
        }

        if (ghost3.current) {
            const angle = elapsed * 0.2;
            ghost3.current.position.set(
                Math.sin(angle) * (7 + Math.cos(elapsed * 0.3)),
                Math.sin(angle),
                Math.cos(angle) * (7 + Math.sin(elapsed * 0.3))
            );
        }
    });

    return (
        <>
            <pointLight ref={ghost1} args={[0xff00ff, 2, 3]} castShadow />
            <pointLight ref={ghost2} args={[0x00ffff, 2, 3]} castShadow />
            <pointLight ref={ghost3} args={[0xffff00, 2, 3]} castShadow />
        </>
    );
};

// =========================================================================
// Floor
// =========================================================================
const Floor: React.FC = () => {
    // add uv2 coordinates to use aoMap
    const geoRef = useUv2();

    const colorTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/grass/color.jpg`
    );
    const aoTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/grass/ambientOcclusion.jpg`
    );
    const normalTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/grass/normal.jpg`
    );
    const roughnessTexture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/assets/textures/grass/roughness.jpg`
    );

    for (const t of [
        colorTexture,
        aoTexture,
        normalTexture,
        roughnessTexture,
    ]) {
        t.repeat.set(8, 8);
        t.wrapS = RepeatWrapping;
        t.wrapT = RepeatWrapping;
    }

    return (
        <mesh rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow>
            <planeBufferGeometry args={[20, 20]} ref={geoRef} />
            <meshStandardMaterial
                args={[
                    {
                        map: colorTexture,
                        aoMap: aoTexture,
                        normalMap: normalTexture,
                        roughnessMap: roughnessTexture,
                    },
                ]}
            />
        </mesh>
    );
};

// =========================================================================
// Lights
// =========================================================================
const Lights: React.FC = () => {
    const directionalLightRef = useCallback((l: DirectionalLight) => {
        if (l) {
            l.shadow.mapSize.width = 256;
            l.shadow.mapSize.height = 256;
            l.shadow.camera.far = 15;
        }
    }, []);

    return (
        <>
            <ambientLight color={0xb9d5ff} intensity={0.1} />
            <directionalLight
                ref={directionalLightRef}
                position={[4, 5, -2]}
                color={0xb9d5ff}
                intensity={0.15}
                castShadow
            />
        </>
    );
};
