import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  List,
  ListItemText,
  ListItem,
  ListItemButton,
  Grid,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { db } from "../services/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function TasksList({ setUpdateTask }) {
  const [tasks, setTasks] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const q = query(collection(db, `users/${user.uid}/tasks`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasks);
    });
  }, []);

  // useEffect(() => {
  //   fetch("https://pokeapi.co/api/v2/pokemon")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setPokeList(data.results);
  //     });
  // }, []);

  if (!tasks?.length) {
    return <h2> No tasks </h2>;
  }

  return (
    <Grid container justifyContent="center" sx={{ margin: "20px 0" }}>
      <List
        disablePadding
        key={crypto.randomUUID()}
        sx={{ width: "100%", maxWidth: 360 }}
      >
        {tasks?.map((task) => {
          const { title, content } = task;
          return (
            // <p key={crypto.randomUUID()}>
            //   <a href={p.url}> {p.name} </a>
            // </p>
            <Grid
              container
              sx={{ backgroundColor: "#171820", maxWidth: "600px" }}
              justifyContent="center"
              alignItems="flex-start"
            >
              <ListItem key={task.id} divider>
                <Grid item xs={8} md={8} sx={{ textAlign: "center" }}>
                  <ListItemText
                    primary={title}
                    secondary={
                      <>
                        <Typography sx={{ display: "inline" }} component="span">
                          {content}
                        </Typography>
                      </>
                    }
                  />
                </Grid>
                <Grid item xs={2} md={2}>
                  {" "}
                  <ListItemButton
                    onClick={async () =>
                      await deleteDoc(
                        doc(db, `users/${user.uid}/tasks/${task.id}`)
                      )
                    }
                  >
                    <ListItemIcon>
                      <DeleteOutlineOutlinedIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </Grid>
                <Grid item xs={2} md={2}>
                  {" "}
                  <ListItemButton onClick={() => setUpdateTask(task)}>
                    <ListItemIcon>
                      <EditOutlinedIcon />
                    </ListItemIcon>
                  </ListItemButton>
                </Grid>
              </ListItem>
            </Grid>
          );
        })}
      </List>
    </Grid>
  );
}

export default TasksList;
