import { useRef } from "react";
import { Object3D } from "three";
import { useFrame } from "react-three-fiber";

interface IParam {
    xSpeed?: number;
    ySpeed?: number;
    zSpeed?: number;
}

export const useRotation = ({ xSpeed, ySpeed, zSpeed }: IParam) => {
    const ref = useRef<Object3D>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            const elapsed = clock.getElapsedTime();
            if (xSpeed) ref.current.rotation.x = xSpeed * elapsed;
            if (ySpeed) ref.current.rotation.y = ySpeed * elapsed;
            if (zSpeed) ref.current.rotation.z = zSpeed * elapsed;
        }
    });
    return ref;
};
