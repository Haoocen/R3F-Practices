import React from "react";
import { Example01 } from "./Example01";
import { Example02 } from "./Example02";
import { Example03 } from "./Example03";
import { Example04 } from "./Example04";
import { Example05 } from "./Example05";
import { Snippet01 } from "./Snippet01";
import { Example06 } from "./Example06";

import { Lesson03 } from "./journey/Lesson03";
import { Lesson10 } from "./journey/Lesson10";
interface Page {
    render: () => JSX.Element;
    path: string;
    title?: string;
    description?: string;
}
export const allExamples: Page[] = [
    {
        render: () => <Example01 />,
        path: "/example-01",
        description: "Basic Concepts",
    },
    {
        render: () => <Example02 />,
        path: "/example-02",
        description: "Basic Concepts cont",
    },
    {
        render: () => <Example03 />,
        path: "/example-03",
        description: "Cameras Perspective vs. Orthographic ",
    },
    { render: () => <Example04 />, path: "/example-04", description: "Lights" },
    {
        render: () => <Example05 />,
        path: "/example-05",
        description: "Materials (1)",
    },
    {
        render: () => <Example06 />,
        path: "/example-06",
    },
];

export const otherExamples: Page[] = [
    {
        render: () => <Snippet01 />,
        path: "/snippet-01",
        description: "Basic Concepts",
        title: "Zoom on load",
    },
];

export const threeJsJourney: Page[] = [
    { render: () => <Lesson03 />, path: "/lesson-03", title: "Lesson03" },
    { render: () => <Lesson10 />, path: "/lesson-10", title: "Lesson10" },
];
