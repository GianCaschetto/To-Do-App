import { Container, Grid, Typography } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import TasksList from "../components/TasksList";
import ToDoForm from "../components/ToDoForm";
import { useState } from "react";

function HomePage() {
  //const [user, loading, error] = useAuthState(auth);
  const [updateTask, setUpdateTask] = useState(null);

  return (
    <Container>
      <NavBar />
      <Typography
        variant="h2"
        sx={{
          fontSize: "40px",
          margin: "20px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        To Do List
      </Typography>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Grid container justifyContent="center" spacing={6}>
          <Grid item justifyContent="center">
            <ToDoForm updateTask={updateTask} setUpdateTask={setUpdateTask} />
          </Grid>
          <Grid item justifyContent="center">
            <TasksList setUpdateTask={setUpdateTask} />
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default HomePage;
