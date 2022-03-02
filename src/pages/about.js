import React from "react";
import { Container, Typography } from "@mui/material";

function About() {
    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                p: 10,
            }}
        >
            <Typography sx={{ mb: 2 }} variant="h2">
                About
            </Typography>
            <Typography
                sx={{ width: "60ch", textAlign: "justify" }}
                variant="h5"
            >
                This is My first Project implementing CRUD(Create Read Update
                Delete), Maybe you confuse about do it now or Schedule it on
                home page,if you don't know i'm using matrix eisenhower so it
                can increase your productivity.
            </Typography>
            <Typography
                sx={{
                    width: "60ch",
                    textAlign: "justify",
                    mt: 2,
                }}
                variant="h5"
            >
                The Eisenhower Matrix is a productivity, prioritization, and
                time-management framework designed to help you prioritize a list
                of tasks or agenda items by first categorizing those items
                according to their urgency and importance.
            </Typography>
        </Container>
    );
}

export default About;
