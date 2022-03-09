import React, { useEffect, useState } from "react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase config";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import moment from "moment";

export default function Update() {
    const params = useParams();
    const [time, setTime] = useState(new Date().getTime());
    const [activities, setActivities] = useState("");
    const [important, setImportant] = useState("");
    const [urgent, setUrgent] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChangeDate = (e) => {
        setTime(e._d.valueOf());
    };

    const handleChangeImportant = (e) => {
        setImportant(e.target.value);
    };

    const handleChangeUrgent = (e) => {
        setUrgent(e.target.value);
    };

    const handleChangeActivities = (e) => {
        setActivities(e.target.value);
    };

    const handleUpdateButton = () => {
        if (
            activities !== "" &&
            moment.duration(time - new Date().getTime()).asHours() > 0
        ) {
            updateToDoList();
            navigate("/");
        } else {
            handleOpen();
        }
    };

    const updateToDoList = async () => {
        const path = doc(db, "to do list", params.id);
        await updateDoc(path, {
            activities: activities,
            time: time,
            urgent: urgent,
            important: important,
        });
    };

    const handleCancelButton = () => {
        navigate("/");
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "max-content",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        py: 3,
        px: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const collectionToDoListRef = collection(db, "to do list");
        const getToDoList = async () => {
            const data = await getDocs(collectionToDoListRef);
            for (let i = 0; i < data.docs.length; i++) {
                if (data.docs[i].id === params.id) {
                    setActivities(data.docs[i].data().activities);
                    setTime(data.docs[i].data().time);
                    setUrgent(data.docs[i].data().urgent);
                    setImportant(data.docs[i].data().important);
                }
            }
        };
        getToDoList();
    }, [params.id]);

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
                        Update To Do List
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 3,
                            [theme.breakpoints.down("md")]: {
                                flexDirection: "column",
                            },
                        }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Your Activities"
                            variant="outlined"
                            onChange={handleChangeActivities}
                            value={activities}
                        />
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <DateTimePicker
                                label="Pick the time & date"
                                value={time}
                                onChange={(e) => handleChangeDate(e)}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 3,
                            mt: 3,
                            [theme.breakpoints.down("md")]: {
                                flexDirection: "column",
                            },
                        }}
                    >
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    is it Important?
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={important}
                                    label="is it Important?"
                                    onChange={handleChangeImportant}
                                >
                                    <MenuItem value={"important"}>
                                        Important
                                    </MenuItem>
                                    <MenuItem value={"not important"}>
                                        not Important
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    is it urgent?
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={urgent}
                                    label="is it Urgent?"
                                    onChange={handleChangeUrgent}
                                >
                                    <MenuItem value={"urgent"}>urgent</MenuItem>
                                    <MenuItem value={"not urgent"}>
                                        not urgent
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <Button
                            onClick={handleCancelButton}
                            sx={{ mt: 3 }}
                            variant="outlined"
                            color="alert"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdateButton}
                            sx={{ mt: 3 }}
                            variant="outlined"
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            ) : (
                <h1>You Have To login first</h1>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" noWrap>
                        Fill the activites first or maybe the time is no more
                        than the current day and hour
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    ></Box>
                </Box>
            </Modal>
        </Container>
    );
}
