import { Color } from "three";
import React from "react";

export const DefaultLights = () => {
  return (
    <>
      <spotLight castShadow position={[50, 60, 25]} intensity={2} />
      <ambientLight color={new Color(0x0c0c0c)} position={[-10, 10, 0]} />
      <spotLight position={[-50, 10, 0]} intensity={0.1} />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />
    </>
  );
};
