import "./index.css";

import { Route, Routes } from "react-router-dom";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./main";

export const backendUrl = "https://note-y31a.onrender.com";

function App() {
  const { setIsAuthenticated, setUser } = useContext(Context);

  const fetchUser = async () => {
    try {
      const userData = await fetch("https://note-y31a.onrender.com/users/me", {
        credentials: "include",
      });

      const res = await userData.json();

      res.success ? setIsAuthenticated(true) : setIsAuthenticated(false);

      setUser(res.user);
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const theme = createTheme({
    background: {
      dark_blue: "#082747",
      light_blue: "#0074ea",
    },
    text: {
      light_blue: "#c2e0ff",
      dark_blue: "#a6e22e",
      light_green: "#a6e22e",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        bgcolor={"#000"}
        py={3}
        px={3}
        minHeight={"100vh"}
        color={theme.text.light_green}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
