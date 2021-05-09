import { OrbitControls, useHelper } from "drei";
import React, { useRef } from "react";
import { Canvas } from "react-three-fiber";
import {
    DirectionalLightHelper,
    HemisphereLightHelper,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    PointLightHelper,
    SpotLightHelper,
} from "three";

export const Lesson14: React.FC = () => {
    const material = new MeshStandardMaterial({ roughness: 0.4 });
    return (
        <Canvas
            colorManagement
            shadowMap
            camera={{
                fov: 45,
                position: [1, 2, 8],
            }}
            onCreated={(state) => state.gl.setClearColor("black")}
        >
            <Lights />
            <OrbitControls />
            <mesh position={[-1.5, 0, 0]} material={material} castShadow>
                <sphereGeometry args={[0.5, 16, 16]} />
            </mesh>
            <mesh position={[1.5, 0, 0]} material={material} castShadow>
                <torusGeometry args={[0.3, 0.2, 32, 64]} />
            </mesh>
            <mesh material={material} castShadow>
                <boxGeometry args={[0.75, 0.75, 0.75]} />
            </mesh>
            <mesh
                receiveShadow
                rotation={[-0.5 * Math.PI, 0, 0]}
                position={[0, -0.5, 0]}
                material={material}
            >
                <planeGeometry args={[5, 5]} />
            </mesh>
        </Canvas>
    );
};

const Lights: React.FC = () => {
    const spotLightTarget = new Object3D();
    spotLightTarget.position.x = -0.75;

    const directionalLightRef = useRef<Mesh | undefined>(undefined);
    const pointLightRef = useRef<Mesh | undefined>(undefined);
    const spotLightRef = useRef<Mesh | undefined>(undefined);
    const hemisphereLightRef = useRef<Mesh | undefined>(undefined);

    useHelper(directionalLightRef, DirectionalLightHelper, 0.2);
    useHelper(pointLightRef, PointLightHelper, 0.2, "yellow");
    useHelper(spotLightRef, SpotLightHelper, "teal");
    useHelper(hemisphereLightRef, HemisphereLightHelper, 0.2);

    return (
        <group>
            <ambientLight color={0xffffff} intensity={0.1} />
            <directionalLight
                ref={directionalLightRef}
                color={0x00fffc}
                intensity={0.3}
                position={[1, 0.25, 0]}
                castShadow
            />
            <hemisphereLight
                args={[0xff0000, 0x0000ff, 1]}
                ref={hemisphereLightRef}
            />
            <pointLight
                args={[0xff9000, 1, 10, 2]}
                ref={pointLightRef}
                position={[1, -0.5, 1]}
                castShadow
            />
            <rectAreaLight
                args={[0x4e00ff, 2, 1, 1]}
                position={[-1.5, 0, 1.5]}
            />
            <spotLight
                args={[0x78ff00, 1, 10, 0.3, 0.25, 1]}
                ref={spotLightRef}
                position={[0, 2, 3]}
                target={spotLightTarget}
                castShadow
            />
            <primitive object={spotLightTarget} />
        </group>
    );
};
