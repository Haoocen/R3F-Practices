import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, OrthographicCamera, PerspectiveCamera } from "drei";
import { PlaneAndAxis } from "../components/PlanAndAxis";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { flatten, range } from "lodash";
import { Color, Group } from "three";

const PLANE_WIDTH = 180;
const PLANE_LENGTH = 180;

export const Example03: React.FC = () => {
  const [camera, setCamera] = useState(false);

  return (
    <>
      <ToggleButtonGroup
        value={camera}
        exclusive
        onChange={(_, newValue) => setCamera(newValue)}
      >
        <ToggleButton value={false}>perspective</ToggleButton>
        <ToggleButton value={true}>orthographic</ToggleButton>
      </ToggleButtonGroup>

      <Canvas colorManagement shadowMap>
        <Camera orthographic={camera} />
        <spotLight castShadow position={[-150, 60, -25]} intensity={4} />
        <ambientLight color={new Color(0x292929)} />
        <OrbitControls />
        <Cubes />
      </Canvas>
    </>
  );
};

const Cubes = () => {
  const ref = useRef<Group>(null);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });
  return (
    <group ref={ref} position={[0, 0, 0]}>
      <PlaneAndAxis width={PLANE_WIDTH} length={PLANE_LENGTH} hideAxis />

      {flatten(
        range(0, PLANE_WIDTH / 5).map((i) =>
          range(0, PLANE_LENGTH / 5).map((j) => {
            const rnd = Math.random() * 0.75 + 0.25;
            return (
              <mesh
                key={`${i}-${j}`}
                position={[
                  -(PLANE_WIDTH / 2) + 2 + i * 5,
                  2,
                  -(PLANE_LENGTH / 2) + 2 + j * 5,
                ]}
              >
                <boxBufferGeometry args={[4, 4, 4]} />
                <meshLambertMaterial color={new Color(rnd, 0, 0)} />
              </mesh>
            );
          })
        )
      )}
    </group>
  );
};

const Camera: React.FC<{ orthographic?: boolean }> = ({ orthographic }) => {
  return (
    <>
      <PerspectiveCamera
        position={[120, 60, 180]}
        fov={45}
        near={0.01}
        far={1000}
        makeDefault={!orthographic}
        zoom={0.7}
      />
      <OrthographicCamera
        left={window.innerWidth / -16}
        right={window.innerWidth / 16}
        top={window.innerHeight / 16}
        bottom={window.innerHeight / -16}
        position={[120, 60, 180]}
        near={-200}
        far={500}
        zoom={6}
        makeDefault={orthographic}
      />
    </>
  );
};
