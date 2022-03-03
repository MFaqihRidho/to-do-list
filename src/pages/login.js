import React, { useEffect } from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Container } from "@mui/material";
import { auth, provider } from "../firebase config";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem("auth", true);
            dispatch({ type: "LOGIN" });
            navigate("/");
        });
    };

    useEffect(() => {
        if (localStorage.getItem("auth") === "true") {
            navigate("/");
        }
    }, [navigate]);

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
                flexDirection: "column",
            }}
        >
            {localStorage.getItem("auth") === "true" ? (
                <h1>You Have been logged</h1>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <h2>Sign in Using google to continue</h2>
                    <Button
                        onClick={signInWithGoogle}
                        variant="contained"
                        color="secondary"
                        sx={{
                            display: "flex",
                            gap: "10px",
                            py: "0px",
                        }}
                    >
                        <GoogleIcon fontSize="small"></GoogleIcon>{" "}
                        <p>Login Using Google</p>
                    </Button>
                </Box>
            )}
        </Container>
    );
}

export default Login;
