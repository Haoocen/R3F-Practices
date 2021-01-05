import React, {useEffect, useRef, useState} from "react";
import {Canvas, useFrame} from "react-three-fiber";
import {PlaneAndAxis} from "../components/PlanAndAxis";
import {Button, Container, Slider, Switch, Typography} from "@material-ui/core";
import {AmbientLight, Color, Mesh, PointLight} from "three";
import {OrbitControls} from "drei";
import {Color as MaterialColor, ColorPicker} from "material-ui-color";
import styled from "styled-components";
import {Space} from "../components/Layouts/Space";

export const Example04: React.FC = () => {
    return (
        <>
            <AmbientLightDemo/>
            <Space height={24}/>
            <PointLightDemo/>
        </>
    )
}

const AmbientLightDemo: React.FC = () => {
    const [color, setColor] = useState('DBEF81')
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
        <>
            <Container>
                <Typography variant="h3">Ambient Light - a globally applied light source </Typography>
                <Typography variant="subtitle1">
                    An ambient light source is not light from a specific direction, so it does
                    not contribute to any shadows. It applies globally. Should be used together
                    with other light sources
                </Typography>
                <Space height={16}/>
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
            </Container>
            <Space height={24}/>
            <Wrapper>
                <Canvas
                    colorManagement
                    shadowMap
                    camera={{
                        position: [10, 20, -40]
                    }}
                >
                    <ambientLight intensity={1} color={new Color(+`0x${color}`)} ref={ambientRef}/>
                    <spotLight position={[20, 20, -10]} intensity={1} castShadow/>
                    <OrbitControls/>
                    <Content/>
                </Canvas>
            </Wrapper>
        </>

    )
}

const PointLightDemo: React.FC = () => {
    const [position, setPosition] = useState<[x:number, y:number, z:number]>([10, 20, 0])
    const ref = useRef<PointLight>(null)
    const lightSourceRef = useRef<Mesh>(null)

    function animate(step: number) {
        const deg = Math.PI / 60
        setPosition(prev => {
            return [
                prev[0] * Math.cos(deg) - prev[2] * Math.sin(deg),
                prev[1],
                prev[2] * Math.cos(deg) + prev[0] * Math.sin(deg),
            ]
        })

        if (step !== 0) {
            requestAnimationFrame(()=>animate(step-1));
        }
    }

    useEffect(() => {
        if (ref.current) {
            [
                ref.current.position.x,
                ref.current.position.y,
                ref.current.position.z
            ] = position
        }

        if (lightSourceRef.current) {
            [
                lightSourceRef.current.position.x,
                lightSourceRef.current.position.y,
                lightSourceRef.current.position.z
            ] = position
        }
    }, [position])


    const handlePosChange = (pos: 0|1|2, value: number | number[]) => {
        if (typeof value === 'number') {
            setPosition(prev => {
                const temp: [x: number, y: number, z:number] = [prev[0], prev[1], prev[2]]
                temp[pos] = value
                return temp
            })
        }
    }

    return (
        <>
            <Container>
                <Typography variant="h3">Point Light - shines in all directions</Typography>
                <Typography variant="subtitle1">
                    A good example of a point light is a signal flare fired
                    in the night sky
                </Typography>
                <Space height={16}/>
                <StyledRow>
                    <div>
                        <Typography variant="h5">Rotate 360 deg </Typography>
                        <Button onClick={() => animate(120)}>Rotate</Button>

                    </div>

                    <Space width={24}/>
                    <div>
                        <Typography variant="h5">Light Position: {position.map(v => v.toPrecision(2)).toString()} </Typography>
                        <StyledColumn>
                            <StyledRow style={{width: 300}}>
                                <Typography variant="h5">x</Typography>
                                <Space width={8}/>
                                <Slider
                                    value={position[0]}
                                    onChange={
                                        (_, value) => handlePosChange(0, value)
                                    }
                                    step={1}
                                    min={-30}
                                    max={30}
                                />
                            </StyledRow>
                            <StyledRow style={{width: 300}}>
                                <Typography variant="h5">y</Typography>
                                <Space width={8}/>
                                <Slider
                                    value={position[1]}
                                    onChange={
                                        (_, value) => handlePosChange(1, value)
                                    }
                                    step={1}
                                    min={-30}
                                    max={30}
                                />
                            </StyledRow>
                            <StyledRow style={{width: 300}}>
                                <Typography variant="h5">z</Typography>
                                <Typography variant="h5">z</Typography>
                                <Space width={8}/>
                                <Slider
                                    value={position[2]}
                                    onChange={
                                        (_, value) => handlePosChange(2, value)
                                    }
                                    step={1}
                                    min={-30}
                                    max={30}
                                />
                            </StyledRow>
                        </StyledColumn>
                    </div>
                </StyledRow>
            </Container>
            <Space width={24}/>
            <Wrapper>
                <Canvas
                    colorManagement
                    shadowMap
                    camera={{
                        position: [10, 20, -40]
                    }}
                >
                    <pointLight position={position} intensity={1} castShadow/>
                    <OrbitControls/>
                    <Content/>
                    <Sphere pos={[20,4,20]}/>
                    <Sphere pos={[-20,4,20]}/>
                    <Sphere pos={[20,4,-20]}/>
                    <Sphere pos={[-20,4,-20]}/>

                    <mesh
                        position={position}
                    >
                        <ambientLight intensity={1} color='white' />
                        <sphereBufferGeometry attach='geometry' args={[0.5,40,40]}/>
                        <meshLambertMaterial color='red'/>
                    </mesh>
                </Canvas>
            </Wrapper>
        </>

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


const Sphere: React.FC<{pos?: [x: number, y: number, z:number]}> = ({pos}) => {
    const sphere = useRef<Mesh>(null)
    
    return (
        <mesh
            ref={sphere}
            position={pos ?? [0, 4, 0]}
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

const Wrapper = styled(Container)`
    height: 500px;
    width: 75%;
    background-color: rgba(250,250,250);
    border: 5px solid grey;    
`

const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
`