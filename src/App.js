import "./App.css";
import Create from "./pages/create";
import Home from "./pages/home";
import Login from "./pages/login";
import About from "./pages/about";
import Update from "./pages/update";
import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
    const mode = useSelector((state) => state.theme);

    const theme = createTheme({
        palette: {
            mode: mode,
            primary: {
                main: "#FCA311",
                ...(mode === "dark" && {
                    main: "#FCA311",
                }),
            },
            secondary: {
                main: "#14213D",
                ...(mode === "dark" && {
                    main: "#14213D",
                }),
            },
            alert: {
                main: "#9d0208",
            },
            background: {
                ...(mode === "light"
                    ? {
                          default: "#E5E5E5",
                          paper: "#E5E5E5",
                      }
                    : {
                          default: "#14213D",
                          paper: "#14213D",
                      }),
            },
            text: {
                ...(mode === "light"
                    ? {
                          primary: "#000000",
                          secondary: "#000000",
                      }
                    : {
                          primary: "#FFFFFF",
                          secondary: "#FFFFFF",
                      }),
            },
        },
    });

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <Navbar></Navbar>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/update/:id" element={<Update />} />
                    </Routes>
                </CssBaseline>
            </ThemeProvider>
        </div>
    );
}

export default App;
