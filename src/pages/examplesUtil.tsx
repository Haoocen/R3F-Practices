import React from "react";
import { Example01 } from "./Example01";
import { Example02 } from "./Example02";
import { Example03 } from "./Example03";

export const allExamples = [
    { render: () => <Example01/>, path: '/example-01', description: 'Basic Concepts' },
    { render: () => <Example02/>, path: '/example-02', description: 'Basic Concepts cont' },
    { render: () => <Example03/>, path: '/example-03', description: 'Cameras Perspective vs. Orthographic ' },
]
