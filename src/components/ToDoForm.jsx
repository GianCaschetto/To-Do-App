import { Button, TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { db } from "../services/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { useEffect } from "react";

function ToDoForm({ updateTask, setUpdateTask }) {
  const [user, loading, error] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  //Valor del campo, si se edita una tarea, se pone su titulo, sino, vacio
  useEffect(() => {
    setValue("title", updateTask?.title ?? "");
    setValue("content", updateTask?.content ?? "");
  }, [updateTask]);

  return (
    <Grid container textAlign="center">
      <form
        onSubmit={handleSubmit(async (data) => {
          if (updateTask) {
            const taskRef = await updateDoc(
              doc(db, `users/${user.uid}/tasks/${updateTask.id}`),
              data
            );
          } else {
            const taskRef = await addDoc(
              collection(db, `users/${user.uid}/tasks`),
              data
            );
          }
          reset();
          setUpdateTask(null);
        })}
      >
        <Grid container flexDirection="column" rowSpacing={2}>
          <Grid item>
            <TextField
              error={errors.title}
              id="standard-basic"
              fullWidth
              label="Title"
              variant="outlined"
              helperText={errors.title ? "Title required" : ""}
              {...register("title", { required: true })}
            />
          </Grid>
          <Grid item>
            <TextField
              error={errors.content}
              helperText={errors.content ? "Content required" : ""}
              multiline
              fullWidth
              minRows={5}
              maxRows={10}
              id="standard-basic"
              label="Content"
              variant="outlined"
              {...register("content", { required: true })}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="outlined" fullWidth>
              {updateTask ? "Update" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default ToDoForm;
