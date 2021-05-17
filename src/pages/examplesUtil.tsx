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
import { Lesson11 } from "./journey/Lesson11";
import { Lesson12 } from "./journey/Lesson12";
import { Lesson13 } from "./journey/Lesson13";
import { Lesson14 } from "./journey/Lesson14";
import { Lesson15 } from "./journey/Lesson15";
import { Lesson16 } from "./journey/Lesson16";
import { Lesson21 } from "./journey/Lesson21";

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
    { render: () => <Lesson11 />, path: "/lesson-11", title: "Lesson11" },
    { render: () => <Lesson12 />, path: "/lesson-12", title: "Lesson12" },
    { render: () => <Lesson13 />, path: "/lesson-13", title: "Lesson13" },
    { render: () => <Lesson14 />, path: "/lesson-14", title: "Lesson14" },
    { render: () => <Lesson15 />, path: "/lesson-15", title: "HauntedHouse" },
    { render: () => <Lesson16 />, path: "/lesson-16", title: "Lesson16" },
    { render: () => <Lesson21 />, path: "/lesson-21", title: "Lesson21" },
];
