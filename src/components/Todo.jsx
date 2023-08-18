import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

function Todo({ title, des, id, isCompleted, deleteTask, updateTask }) {
  return (
    <>
      <Grid
        item
        xs={9}
        bgcolor={"#0074ea"}
        p={1.2}
        borderRadius={"20px 0px 0px 0px"}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{des}</Typography>
      </Grid>
      <Grid
        item
        xs={3}
        bgcolor={"#0074ea"}
        p={1.2}
        borderRadius={"0px 0px 20px 0px"}
      >
        <Box ml={"auto"} display={"flex"} justifyContent={"end"}>
          <Checkbox
            sx={{
              color: "#ffff",
              "&.Mui-checked": { color: "#a6e22e" },
            }}
            checked={isCompleted}
            onChange={() => updateTask(id)}
          />

          <IconButton onClick={() => deleteTask(id)}>
            <Delete color="error" />
          </IconButton>
        </Box>
      </Grid>
    </>
  );
}

export default Todo;
