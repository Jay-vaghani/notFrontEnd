import { Email, Person } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../main";

function Profile() {
  const { user } = useContext(Context);


  return (
    <Stack>
      <Stack mt={3} direction={"row"} alignItems={"center"} spacing={2}>
        <Avatar sx={{ bgcolor: "#082747", width: 56, height: 56 }}>
          <Person sx={{ color: "#a6e22e" }} fontSize="large" />
        </Avatar>
        <Typography variant="h5">{user?.name}</Typography>
      </Stack>
      <Stack mt={3} direction={"row"} alignItems={"center"} spacing={2}>
        <Avatar sx={{ bgcolor: "#082747", width: 56, height: 56 }}>
          <Email sx={{ color: "#a6e22e" }} fontSize="large" />
        </Avatar>
        <Typography variant="h5">{user?.email}</Typography>
      </Stack>
    </Stack>
  );
}

export default Profile;
