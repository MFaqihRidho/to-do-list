import "./App.css";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { height } from "@mui/system";

function App() {
    const mode = useSelector((state) => state.theme);

    const theme = createTheme({
        palette: {
            mode: mode,
        },
    });

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Paper style={{ height: "100vh" }}>
                    <Navbar></Navbar>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Paper>
            </ThemeProvider>
        </div>
    );
}

export default App;
