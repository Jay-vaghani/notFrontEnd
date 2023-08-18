import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { backendUrl } from "../App";
import { Navigate } from "react-router-dom";
import { Context } from "../main";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `${backendUrl}/users/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    data.success ? setIsAuthenticated(true) : setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <Box component="form" mt={3} onSubmit={handelSubmit}>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item xs={12} sm={6.1}>
            <TextField
              label="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              InputLabelProps={{
                style: {
                  color: "#a6e22e",
                },
              }}
              sx={{
                bgcolor: "#0074ea61",
                border: "none",
                borderRadius: 1,
                width: " 100%",
              }}
              variant="outlined"
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6.1}>
            <TextField
              label="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              InputLabelProps={{
                style: {
                  color: "#a6e22e",
                },
              }}
              sx={{
                bgcolor: "#0074ea61",
                border: "none",
                borderRadius: 1,
                width: " 100%",
              }}
              variant="outlined"
              color="success"
            />
            <Button
              sx={{ mt: 2, width: "100%" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Login;
