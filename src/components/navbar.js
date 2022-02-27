import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [checked, setChecked] = useState(false);
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    const handleToggleDarkMode = () => {
        if (theme === "dark") {
            dispatch({ type: "LIGHT_MODE" });
            localStorage.setItem("theme", "light");
            setChecked(false);
        } else {
            dispatch({ type: "DARK_MODE" });
            localStorage.setItem("theme", "dark");
            setChecked(true);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("theme") === "dark") {
            dispatch({ type: "DARK_MODE" });
            setChecked(true);
        } else {
            setChecked(false);
            dispatch({ type: "LIGHT_MODE" });
        }
    }, []);

    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null);
        navigate(page);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                        TO DO LIST
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem onClick={() => handleCloseNavMenu("/")}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleCloseNavMenu("/login")}
                            >
                                <Typography textAlign="center">
                                    Login
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        TO DO LIST
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            onClick={() => navigate("/")}
                            variant="h1"
                            sx={{ my: 2, display: "block" }}
                        >
                            <Typography variant="h6" noWrap>
                                Home
                            </Typography>
                        </Button>
                        <Button
                            onClick={() => navigate("/login")}
                            variant="h1"
                            sx={{ my: 2, display: "block" }}
                        >
                            <Typography variant="h6" noWrap>
                                Login
                            </Typography>
                        </Button>
                    </Box>

                    <Box display={"flex"} sx={{ flexGrow: 0 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={checked}
                                    onChange={handleToggleDarkMode}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                            }
                            label={
                                localStorage.getItem("theme") === "dark"
                                    ? "light mode?"
                                    : "dark mode?"
                            }
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
