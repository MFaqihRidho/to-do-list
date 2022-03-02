import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase config";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";

function Home() {
    const [toDoList, setToDoList] = useState([]);
    const collectionToDoListRef = collection(db, "to do list");
    const theme = useTheme();

    useEffect(() => {
        const getToDoList = async () => {
            const data = await getDocs(collectionToDoListRef);
            setToDoList(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        getToDoList();
    }, []);

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
                        minHeight: "100vh",
                        width: "100%",
                        pb: 5,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
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
                        {auth?.currentUser?.displayName} To Do List
                    </Typography>
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(2, 1fr)"
                        gap={2}
                        sx={{ width: "100%", px: 10 }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "#5FAD56",
                                width: "100%",
                                minHeight: "50vh",
                                boxShadow: 5,
                                py: 2,
                                px: 3,
                            }}
                            gridColumn="span 1"
                        >
                            <Typography
                                variant="h5"
                                sx={{ textAlign: "center" }}
                            >
                                Do It Now
                            </Typography>
                            {toDoList.map((data) => (
                                <div>
                                    {data.author.id === auth.currentUser.uid &&
                                    data.important === "important" &&
                                    data.urgent === "urgent" ? (
                                        <Card sx={{ minWidth: 275, mt: 1 }}>
                                            <CardContent>
                                                <Typography
                                                    sx={{
                                                        fontSize: 24,
                                                        fontWeight: "bold",
                                                    }}
                                                    color="text.secondary"
                                                    gutterBottom
                                                >
                                                    {data.activities}
                                                </Typography>
                                                <Typography
                                                    sx={{ mb: 1.5 }}
                                                    color="text.secondary"
                                                >
                                                    adjective
                                                </Typography>
                                                <Typography variant="body2">
                                                    well meaning and kindly.
                                                    <br />
                                                    {'"a benevolent smile"'}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">
                                                    Mark as Done
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    ) : null}
                                </div>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#F2C14E",
                                width: "100%",
                                minHeight: "50vh",
                                boxShadow: 5,
                                py: 2,
                                px: 3,
                            }}
                            gridColumn="span 1"
                        >
                            <Typography
                                variant="h5"
                                sx={{ textAlign: "center" }}
                            >
                                Schedule It Now
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#F78154",
                                width: "100%",
                                minHeight: "50vh",
                                boxShadow: 5,
                                py: 2,
                                px: 3,
                            }}
                            gridColumn="span 1"
                        >
                            <Typography
                                variant="h5"
                                sx={{ textAlign: "center" }}
                            >
                                Delegate It
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "#4D9078",
                                width: "100%",
                                minHeight: "50vh",
                                boxShadow: 5,
                                py: 2,
                                px: 3,
                            }}
                            gridColumn="span 1"
                        >
                            <Typography
                                variant="h5"
                                sx={{ textAlign: "center" }}
                            >
                                Just Delete it
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <h1>You Have to Login First</h1>
            )}
        </Container>
    );
}

export default Home;
