import "./App.css";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
    const [theme, setTheme] = useState(false);

    return (
        <div className="App">
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
