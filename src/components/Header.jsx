import { useTheme } from "@emotion/react";
import {
  Close,
  Home,
  Inbox,
  LockOpen,
  Login,
  Logout,
  Menu,
  Person,
  PersonAddAlt1,
  PowerSettingsNew,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { backendUrl } from "../App";

// For Slide Down Menu Effect

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Header() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();


  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (link) => {
    setOpen(false);

    navigate(link);
  };

  const linkHover = {
    transition: "0.3s",
    "&:hover": {
      fontWeight: 600,
      scale: "1.04",
      cursor: "pointer",
    },
  };

  const logOutHandler = async () => {
    const { data } = await axios.get(`${backendUrl}/users/logout`, {
      withCredentials: true,
    });

    setIsAuthenticated(false);
    navigate("/login")
  };


  return (
    <Stack
      direction={"row"}
      bgcolor={theme.background.dark_blue}
      px={2}
      sx={{ borderRadius: 3 }}
      py={3}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box>
        <Typography
          variant="h5"
          fontWeight={"500"}
          color={theme.text.light_green}
        >
          TODO
        </Typography>
      </Box>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <Stack direction={"row"} gap={2}>
          <NavLink style={{ textDecoration: "none" }} to={"/"}>
            <Typography
              variant="h6"
              sx={linkHover}
              fontWeight={"500"}
              color={theme.text.light_green}
            >
              Home
            </Typography>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to={"/profile"}>
            <Typography
              variant="h6"
              sx={linkHover}
              fontWeight={"500"}
              color={theme.text.light_green}
            >
              Profile
            </Typography>
          </NavLink>
          {!isAuthenticated ? (
            <NavLink style={{ textDecoration: "none" }} to={"/login"}>
              <Typography
                variant="h6"
                sx={linkHover}
                fontWeight={"500"}
                color={theme.text.light_green}
              >
                Login
              </Typography>
            </NavLink>
          ) : (
            <NavLink
              style={{ textDecoration: "none" }}
              to={"/register"}
              onClick={logOutHandler}
            >
              <Typography
                variant="h6"
                sx={linkHover}
                fontWeight={"500"}
                color={theme.text.light_green}
              >
                Logout
              </Typography>
            </NavLink>
          )}

          <NavLink style={{ textDecoration: "none" }} to={"/register"}>
            <Typography
              variant="h6"
              sx={linkHover}
              fontWeight={"500"}
              color={theme.text.light_green}
            >
              Register
            </Typography>
          </NavLink>
        </Stack>
      </Box>
      <IconButton
        sx={{
          display: {
            xs: "flex",
            sm: "none",
          },
          color: "#fff",
        }}
        size="large"
        color="success"
        onClick={handleClickOpen}
      >
        <Menu sx={{ color: theme.text.light_green }} />
      </IconButton>
      <Dialog
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box bgcolor={theme.background.dark_blue}>
          <DialogTitle
            borderBottom={1}
            borderColor={"lightblue"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={500} color={theme.text.light_green}>
              Menu
            </Typography>
            <IconButton
              sx={{ color: theme.text.light_green }}
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <List sx={{ width: "100%" }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClose("/");
                }}
              >
                <ListItemIcon>
                  <Home sx={{ color: theme.text.light_green }} />
                </ListItemIcon>
                <ListItemText
                  primary="HOME"
                  sx={{ color: theme.text.light_green }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClose("/profile");
                }}
              >
                <ListItemIcon>
                  <Person sx={{ color: theme.text.light_green }} />
                </ListItemIcon>
                <ListItemText
                  primary="PROFILE"
                  sx={{ color: theme.text.light_green }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClose("/login");
                }}
              >
                <ListItemIcon>
                  <Login sx={{ color: theme.text.light_green }} />
                </ListItemIcon>
                <ListItemText
                  primary="LOGIN"
                  sx={{ color: theme.text.light_green }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClose("/register");
                }}
              >
                <ListItemIcon>
                  <PersonAddAlt1 sx={{ color: theme.text.light_green }} />
                </ListItemIcon>
                <ListItemText
                  primary="REGISTER"
                  sx={{ color: theme.text.light_green }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Dialog>
    </Stack>
  );
}

export default Header;
