import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import Todo from "../components/Todo";
import * as Accordion from "@radix-ui/react-accordion";

function Home() {
  const { isAuthenticated } = useContext(Context);
  const [add, setAdd] = useState(1);
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchList = async () => {
    const { data } = await axios.get(`${backendUrl}/task/my`, {
      withCredentials: true,
    });

    setRefresh((prev) => !prev);
    setList(data.tasks);
  };

  const updateHandler = async (id) => {
    const updateTask = await fetch(`${backendUrl}/task/${id}`, {
      method: "PUT",
      credentials: "include",
    });
    setRefresh((prev) => !prev);
  };

  const deleteHandler = async (id) => {
    const deleteTask = await fetch(`${backendUrl}/task/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    fetchList();
  }, [refresh]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => {
    setExpanded(panel);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const task = await axios.post(
      `${backendUrl}/task/new`,
      {
        title,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  const AccordionStyle = {
    backgroundColor: "#082747",
    borderRadius: 2,
    padding: 3,
    width: "100%",
  };

  const AccordionContentStyle = {
    color: "#a6e22e",
    fontWeight: 500,
    fontSize: "18px",
    margin: "7px 0",
  };

  return (
    <>
      <Box component="form" mt={3} onSubmit={handelSubmit}>
        <Grid
          container
          justifyContent={{
            xs: "start",
            sm: "center",
          }}
          spacing={2}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              required
              label="Title"
              type="text"
              size="small"
              InputLabelProps={{
                style: {
                  color: "#a6e22e",
                },
              }}
              sx={{
                bgcolor: "#0074ea61",
                border: "none",
                borderRadius: 0,
                width: " 100%",
              }}
              variant="outlined"
              color="success"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Description"
              type="text"
              size="medium"
              InputLabelProps={{
                style: {
                  color: "#a6e22e",
                },
              }}
              sx={{
                bgcolor: "#0074ea61",
                border: "none",
                width: " 100%",
                scale: 6,
              }}
              variant="outlined"
              color="success"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              sx={{
                my: "20px",
                display: "block",
                bgcolor: "#0074ea61",
                width: "100%",
              }}
              onClick={() => setAdd(add + 1)}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
      {list.length ? (
        <Stack justifyContent={"center"} alignItems={"center"} my={3}>
          <Grid container sx={AccordionStyle} rowSpacing={2} rowGap={2}>
            {list.map((item) => {
              return (
                <Todo
                  title={item.title}
                  des={item.description}
                  id={item._id}
                  isCompleted={item.isCompleted}
                  key={item._id}
                  updateTask={updateHandler}
                  deleteTask={deleteHandler}
                />
              );
            })}
          </Grid>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
}

export default Home;
