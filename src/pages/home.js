import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase config";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";

function Home() {
    const collectionToDoListRef = collection(db, "to do list");
    const theme = useTheme();
    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            {localStorage.getItem("auth") === "true" ? (
                <Box
                    sx={{
                        backgroundColor: "background.paper",
                        m: 5,
                        boxShadow: 5,
                        minHeight: "fit",
                        width: "75%",
                        pb: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        justifyItems: "center",
                        [theme.breakpoints.down("md")]: {
                            px: 10,
                            width: "100%",
                        },
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            m: 3,
                            width: "100%",
                        }}
                    >
                        Your To Do List
                    </Typography>
                </Box>
            ) : (
                <h1>You Have to Login First</h1>
            )}
        </Container>
    );
}

export default Home;
