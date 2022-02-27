import React from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Container } from "@mui/material";

function Login() {
    return (
        <Container>
            <Button variant="contained" color="secondary">
                <GoogleIcon fontSize="small"></GoogleIcon> Login using google
            </Button>
        </Container>
    );
}

export default Login;
