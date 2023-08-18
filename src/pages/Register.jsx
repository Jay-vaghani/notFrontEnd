import React, { useContext, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { backendUrl } from "../App";
import toast, { Toaster } from "react-hot-toast";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

function Register() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("ok");
    toast.success("Successfully toasted!");

    const { data } = await axios.post(
      `${backendUrl}/users/new`,
      {
        name,
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


    data.success ? setIsAuthenticated(true) : setIsAuthenticated(false);

  };



  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <Box component="form" mt={3} onSubmit={handelSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              label="Name"
              type="text"
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
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              label="Email"
              type="email"
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
          <Grid item xs={12}>
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              label="Password"
              type="password"
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

export default Register;
