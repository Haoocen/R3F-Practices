import React from "react";
import { Color } from "three";

interface IProps {
  width?: number;
  length?: number;
  planeColor?: Color;
  hideAxis?: boolean;
}

export const PlaneAndAxis: React.FC<IProps> = ({
  width,
  length,
  planeColor,
  hideAxis,
}) => {
  return (
    <>
      <mesh rotation={[-0.5 * Math.PI, 0, 0]} receiveShadow>
        <planeBufferGeometry
          attach="geometry"
          args={[width ?? 60, length ?? 40]}
        />
        <shadowMaterial opacity={0.3} />
      </mesh>
      <mesh rotation={[-0.5 * Math.PI, 0, 0]}>
        <planeBufferGeometry
          attach="geometry"
          args={[width ?? 60, length ?? 40]}
        />
        <meshLambertMaterial
          attach="material"
          color={planeColor ?? "lightgray"}
        />
      </mesh>
      {!hideAxis ? (
        <axesHelper args={[Math.min(width ?? 60, length ?? 40) / 2]} />
      ) : null}
    </>
  );
};
