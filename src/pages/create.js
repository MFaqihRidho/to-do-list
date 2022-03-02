import React from "react";
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
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase config";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Create() {
    const [time, setTime] = React.useState(new Date());
    const [activities, setActivities] = React.useState("");
    const [important, setImportant] = React.useState("important");
    const [urgent, setUrgent] = React.useState("urgent");

    const navigate = useNavigate();
    const theme = useTheme();

    const handleChangeDate = (e) => {
        setTime(e._d.valueOf());
        console.log(e._d.valueOf());
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

    const handleAddButton = () => {
        addToDoList();
        navigate("/");
    };

    const collectionToDoListRef = collection(db, "to do list");

    const addToDoList = async () => {
        await addDoc(collectionToDoListRef, {
            time,
            activities,
            important,
            urgent,
            author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
            },
        });
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
                        Add To Do List
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
                    <Button
                        onClick={handleAddButton}
                        sx={{ mt: 3 }}
                        variant="outlined"
                    >
                        Add
                    </Button>
                </Box>
            ) : (
                <h1>You Have To login first</h1>
            )}
        </Container>
    );
}

export default Create;
