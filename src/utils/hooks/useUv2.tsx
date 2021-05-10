import { useCallback } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";

export const useUv2 = (): ((g: BufferGeometry) => void) => {
    return useCallback((g: BufferGeometry) => {
        if (g) {
            g.setAttribute(
                "uv2",
                new Float32BufferAttribute(g.attributes.uv.array, 2)
            );
        }
    }, []);
};
