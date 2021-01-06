import { Html, OrbitControls } from "drei";
import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Color, Mesh, MeshNormalMaterial, MultiplyBlending } from "three";
import { DefaultLights } from "../components/DefaultLights";
import { PlaneAndAxis } from "../components/PlanAndAxis";
import { Button, Switch, Typography } from "@material-ui/core";
import { useSpring, animated } from "react-spring/three";

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
        <NormalCubes />
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
      <group position={[16, 8, 0]}>
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
