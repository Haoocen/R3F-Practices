import React, {useEffect, useRef, useState} from "react";
import {Canvas} from "react-three-fiber";
import {PlaneAndAxis} from "../components/PlanAndAxis";
import {Container, Slider, Typography} from "@material-ui/core";
import {AmbientLight, Color, Mesh} from "three";
import {OrbitControls} from "drei";
import {Color as MaterialColor, ColorPicker} from "material-ui-color";
import styled from "styled-components";
import {Space} from "../components/Layouts/Space";

export const Example04: React.FC = () => {
    return (
        <>
            <Content1/>
            <Content2/>
        </>
    )
}

const Content1: React.FC = (children) => {
    const [color, setColor] = useState('FFFFFF')
    const [intensity, setIntensity] = useState(1)

    const handleChangeColor = (c: MaterialColor) => {
        setColor(c.hex)
    }
    const handleChangeIntensity = (_: any, value: number | number[]) => {
        if (typeof value === 'number') {
            setIntensity(value)
        }
    }

    const ambientRef = useRef<AmbientLight>(null)

    useEffect(() => {
        if (ambientRef.current) {
            ambientRef.current.color = new Color(+`0x${color}`)
            ambientRef.current.intensity = intensity
        }
    }, [color, intensity])

    return (
        <Container style={{height: window.innerHeight}}>
            <h3>Ambient Light - a globally applied light source </h3>
            <p>
                An ambient light source is not light from a specific direction, so it does
                not contribute to any shadows. It applies globally. Should be used together
                with other light sources
            </p>
            <StyledRow>
                <div>
                    <Typography variant="h5">Color</Typography>
                    <ColorPicker
                        onChange={handleChangeColor}
                        value={`#${color}`}
                        hideTextfield
                        disableAlpha
                    />
                </div>
                <Space width={24}/>
               <div style={{width: 300}}>
                   <Typography variant="h5">Intensity: {intensity}</Typography>
                   <Slider
                       value={intensity}
                       onChange={handleChangeIntensity}
                       step={0.1}
                       min={0}
                       max={5}
                   />
               </div>
            </StyledRow>


            <Canvas
                colorManagement
                shadowMap
                camera={{
                    position: [10, 40, -50]
                }}
            >
                <ambientLight intensity={1} color='white' ref={ambientRef}/>
                <spotLight position={[20, 30, -10]} intensity={1} castShadow/>
                <OrbitControls/>
                <Content/>
            </Canvas>
        </Container>
    )
}

const Content2: React.FC = (children) => {
    return (
        <Container style={{height: window.innerHeight}}>
            <h3>Ambient Light - a globally applied light source </h3>
            <Canvas
                camera={{
                    position: [10, 40, -50]
                }}
            >
                <Content/>
            </Canvas>
        </Container>
    )
}

const Content = () => {
    return (
        <>
            <Sphere/>
            <OrbitControls/>
            <PlaneAndAxis width={50} length={50} hideAxis/>
        </>
    )
}


const Sphere = () => {
    const sphere = useRef<Mesh>(null)
    
    return (
        <mesh
            ref={sphere}
            position={[0, 4, 0]}
            castShadow
            onClick={ () => {
                if (sphere.current ) {
                    sphere.current.position.x += 10
                }
            } }
        >
            <sphereGeometry attach='geometry' args={[4, 40, 40]}/>
            <meshLambertMaterial attach='material' color='white'/>
        </mesh>
    )
}

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
`