import { Container, Grid } from "@material-ui/core";
import React from "react";
import { allExamples, otherExamples, threeJsJourney } from "./examplesUtil";
import { Link } from "react-router-dom";
import { MyCharacter } from "../components/MyCharacter";

const Home: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {allExamples.map(({ path }, index) => (
                        <Grid key={path} item>
                            <Link to={path}>Example {index + 1}</Link>
                        </Grid>
                    ))}
                </Grid>
                <Grid container justify="center" spacing={2}>
                    {otherExamples.map(({ path, title }) => (
                        <Grid key={path} item>
                            <Link to={path}>{title}</Link>
                        </Grid>
                    ))}
                </Grid>
                <Grid container justify="center" spacing={2}>
                    {threeJsJourney.map(({ path, title }) => (
                        <Grid key={path} item>
                            <Link to={path}>{title}</Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            <Container style={{ width: "100%", height: window.innerHeight }}>
                <MyCharacter />
            </Container>
        </Container>
    );
};

export default Home;
