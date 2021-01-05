import {Container, Grid} from '@material-ui/core';
import React from 'react';
import {allExamples} from "./examplesUtil";
import {Link} from "react-router-dom";

const Home: React.FC = () => {

    return (
        <Container maxWidth="lg">
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {allExamples.map(({path, description}, index) => (
                        <Grid key={path} item>
                            <Link to={path}>Example {index+1}</Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;