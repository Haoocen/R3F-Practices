import { OrbitControls, useHelper } from "drei";
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "react-three-fiber";
import {
    Camera,
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLightHelper,
    Mesh,
    MeshStandardMaterial,
    Object3D,
    PCFSoftShadowMap,
    PointLightHelper,
    SpotLightHelper,
} from "three";

export const Lesson14: React.FC = () => {
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
            <Content />
        </Canvas>
    );
};

const Content: React.FC = () => {
    const material = new MeshStandardMaterial({ roughness: 0.4 });
    const { gl } = useThree();
    gl.shadowMap.type = PCFSoftShadowMap;

    return (
        <>
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
                position={[0, -1, 0]}
                material={material}
            >
                <planeGeometry args={[5, 5]} />
            </mesh>
        </>
    );
};

const Lights: React.FC = () => {
    const spotLightTarget = new Object3D();
    spotLightTarget.position.x = -0.75;

    const directionalLightRef = useRef<DirectionalLight | undefined>(undefined);
    const pointLightRef = useRef<Mesh | undefined>(undefined);
    const spotLightRef = useRef<Mesh | undefined>(undefined);
    const hemisphereLightRef = useRef<Mesh | undefined>(undefined);

    useHelper(directionalLightRef, DirectionalLightHelper, 0.2);
    useHelper(pointLightRef, PointLightHelper, 0.2, "yellow");
    useHelper(spotLightRef, SpotLightHelper, "teal");
    useHelper(hemisphereLightRef, HemisphereLightHelper, 0.2);

    const [dCamera, setCamera] = useState<Camera | undefined>(undefined);

    useEffect(() => {
        // console.log(directionalLightRef.current?.shadow.camera);
        const s = directionalLightRef.current?.shadow;
        if (s) {
            s.mapSize.set(1024, 1024);

            const c = s.camera;
            // by setting the range of the orthographic camera, we are boosting perfomance
            // since the showdow map would be smaller
            c.top = 2;
            c.bottom = -2;
            c.left = -2;
            c.right = 2;
            c.near = 1;
            c.far = 4;
        }
        setCamera(s?.camera);
    });

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
            {dCamera ? <cameraHelper args={[dCamera]} /> : null}
        </group>
    );
};
