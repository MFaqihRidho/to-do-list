import React, { useEffect, useState } from "react";
import {
    getDocs,
    collection,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";
import { db, auth } from "../firebase config";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import { Button } from "@mui/material";
import moment from "moment";
import { Modal } from "@mui/material";

function Home() {
    const [toDoList, setToDoList] = useState([]);
    const [update, setUpdate] = useState({
        activities: "sdasd",
        important: "important",
        time: 1646348452000,
        urgent: "urgent",
    });
    const [id, setId] = useState([]);
    const collectionToDoListRef = collection(db, "to do list");
    const [open, setOpen] = React.useState(false);
    const handleOpen = (id) => {
        setOpen(true);
        setId(id);
    };
    const handleClose = () => setOpen(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "max-content",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        py: 1,
        px: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    const theme = useTheme();

    useEffect(() => {
        const getToDoList = async () => {
            const data = await getDocs(collectionToDoListRef);
            setToDoList(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            console.log(toDoList);
        };
        getToDoList();
    }, []);

    const deleteToDoList = async (id) => {
        const path = doc(db, "to do list", id);
        await deleteDoc(path);
        window.location.reload();
        setId("");
    };

    const updateToDoList = async (id) => {
        const path = doc(db, "to do list", id);
        await updateDoc(path, update);
        window.location.reload();
        setId("");
    };

    const editStyle = {
        color: "rgb(95, 173, 86)",
        "&:hover": {
            background: "rgba(95, 173, 86,0.1)",
        },
    };

    const deleteStyle = {
        color: "rgb(247, 129, 84)",
        "&:hover": {
            background: "rgba(247, 129, 84,0.1)",
        },
    };

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
                                    {data.author.id ===
                                        auth?.currentUser?.uid &&
                                    data.important === "important" &&
                                    data.urgent === "urgent" ? (
                                        <Card sx={{ minWidth: 275, mt: 1 }}>
                                            <CardHeader
                                                title={
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {data.activities}
                                                    </Typography>
                                                }
                                                subheader={`${Number(
                                                    moment
                                                        .duration(
                                                            data?.time -
                                                                new Date().getTime()
                                                        )
                                                        .asHours()
                                                ).toFixed(2)} hours remaining`}
                                            />
                                            <CardActions
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-around",
                                                }}
                                            >
                                                <Button size="small">
                                                    Mark as Done
                                                </Button>
                                                <Button
                                                    sx={editStyle}
                                                    size="small"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleOpen(data.id)
                                                    }
                                                    sx={deleteStyle}
                                                    size="small"
                                                >
                                                    Delete
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
                            {toDoList.map((data) => (
                                <div>
                                    {data.author.id ===
                                        auth?.currentUser?.uid &&
                                    data.important === "important" &&
                                    data.urgent === "not urgent" ? (
                                        <Card sx={{ minWidth: 275, mt: 1 }}>
                                            <CardHeader
                                                title={
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {data.activities}
                                                    </Typography>
                                                }
                                                subheader={`${Number(
                                                    moment
                                                        .duration(
                                                            data?.time -
                                                                new Date().getTime()
                                                        )
                                                        .asHours()
                                                ).toFixed(2)} hours remaining`}
                                            />
                                            <CardActions
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-around",
                                                }}
                                            >
                                                <Button size="small">
                                                    Mark as Done
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        updateToDoList(data.id)
                                                    }
                                                    sx={editStyle}
                                                    size="small"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleOpen(data.id)
                                                    }
                                                    sx={deleteStyle}
                                                    size="small"
                                                >
                                                    Delete
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    ) : null}
                                </div>
                            ))}
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
                                Delegate It
                            </Typography>
                            {toDoList.map((data) => (
                                <div>
                                    {data.author.id ===
                                        auth?.currentUser?.uid &&
                                    data.important === "not important" &&
                                    data.urgent === "urgent" ? (
                                        <Card sx={{ minWidth: 275, mt: 1 }}>
                                            <CardHeader
                                                title={
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {data.activities}
                                                    </Typography>
                                                }
                                                subheader={`${Number(
                                                    moment
                                                        .duration(
                                                            data?.time -
                                                                new Date().getTime()
                                                        )
                                                        .asHours()
                                                ).toFixed(2)} hours remaining`}
                                            />
                                            <CardActions
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-around",
                                                }}
                                            >
                                                <Button size="small">
                                                    Mark as Done
                                                </Button>
                                                <Button
                                                    sx={editStyle}
                                                    size="small"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleOpen(data.id)
                                                    }
                                                    sx={deleteStyle}
                                                    size="small"
                                                >
                                                    Delete
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    ) : null}
                                </div>
                            ))}
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
                                Just Delete it
                            </Typography>
                            {toDoList.map((data) => (
                                <div>
                                    {data.author.id ===
                                        auth?.currentUser?.uid &&
                                    data.important === "not important" &&
                                    data.urgent === "not urgent" ? (
                                        <Card sx={{ minWidth: 275, mt: 1 }}>
                                            <CardHeader
                                                title={
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {data.activities}
                                                    </Typography>
                                                }
                                                subheader={`${Number(
                                                    moment
                                                        .duration(
                                                            data?.time -
                                                                new Date().getTime()
                                                        )
                                                        .asHours()
                                                ).toFixed(2)} hours remaining`}
                                            />
                                            <CardActions
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-around",
                                                }}
                                            >
                                                <Button size="small">
                                                    Mark as Done
                                                </Button>
                                                <Button
                                                    sx={editStyle}
                                                    size="small"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleOpen(data.id)
                                                    }
                                                    sx={deleteStyle}
                                                    size="small"
                                                >
                                                    Delete
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    ) : null}
                                </div>
                            ))}
                        </Box>
                    </Box>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography variant="h6" noWrap>
                                Do you really want to Delete this to do?
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    onClick={handleClose}
                                    variant="h1"
                                    sx={{ my: 2, display: "block" }}
                                >
                                    <Typography variant="h6" noWrap>
                                        No
                                    </Typography>
                                </Button>
                                <Button
                                    onClick={() => deleteToDoList(id)}
                                    variant="h1"
                                    sx={{ my: 2, display: "block" }}
                                >
                                    <Typography variant="h6" noWrap>
                                        Yes
                                    </Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            ) : (
                <h1>You Have to Login First</h1>
            )}
        </Container>
    );
}

export default Home;
