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
import { signOut } from "firebase/auth";
import { auth } from "../firebase config";
import Modal from "@mui/material/Modal";

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [checked, setChecked] = useState(false);
    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        py: 3,
        px: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

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

    const handleLogOut = () => {
        signOut(auth);
        localStorage.setItem("auth", false);
        navigate("/login");
        handleClose();
    };

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
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
                            {localStorage.getItem("auth") === "true" ? (
                                <MenuItem
                                    onClick={() =>
                                        handleCloseNavMenu("/create")
                                    }
                                >
                                    <Typography textAlign="center">
                                        Create
                                    </Typography>
                                </MenuItem>
                            ) : null}
                            {localStorage.getItem("auth") === "true" ? (
                                <MenuItem onClick={handleOpen}>
                                    <Typography textAlign="center">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem
                                    onClick={() => handleCloseNavMenu("/login")}
                                >
                                    <Typography textAlign="center">
                                        Login
                                    </Typography>
                                </MenuItem>
                            )}
                            <MenuItem
                                onClick={() => handleCloseNavMenu("/about")}
                            >
                                <Typography textAlign="center">
                                    About
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
                        {localStorage.getItem("auth") === "true" ? (
                            <Button
                                onClick={() => navigate("/create")}
                                variant="h1"
                                sx={{ my: 2, display: "block" }}
                            >
                                <Typography variant="h6" noWrap>
                                    Create
                                </Typography>
                            </Button>
                        ) : null}

                        {localStorage.getItem("auth") === "true" ? (
                            <Button
                                onClick={handleOpen}
                                variant="h1"
                                sx={{ my: 2, display: "block" }}
                            >
                                <Typography variant="h6" noWrap>
                                    Logout
                                </Typography>
                            </Button>
                        ) : (
                            <Button
                                onClick={() => navigate("/login")}
                                variant="h1"
                                sx={{ my: 2, display: "block" }}
                            >
                                <Typography variant="h6" noWrap>
                                    Login
                                </Typography>
                            </Button>
                        )}
                        <Button
                            onClick={() => navigate("/About")}
                            variant="h1"
                            sx={{ my: 2, display: "block" }}
                        >
                            <Typography variant="h6" noWrap>
                                About
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
                                    ? "light?"
                                    : "dark?"
                            }
                        />
                    </Box>
                </Toolbar>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" noWrap>
                        Do you really want to logout?
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
                            onClick={handleLogOut}
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
        </AppBar>
    );
};
export default Navbar;
