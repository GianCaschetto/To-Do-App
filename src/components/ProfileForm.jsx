import { Button, Grid, TextField } from "@mui/material";
import { db, auth } from "../services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";

function ProfileForm() {
  const [user, loading, error] = useAuthState(auth);
  const [imageUpload, setImageUpload] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <Grid container textAlign="center">
      <form
        onSubmit={handleSubmit(async (data) => {
          if (imageUpload) {
            const storageRef = ref(
              storage,
              `profileImages/${imageUpload.name}`
            );
            uploadBytes(storageRef, imageUpload).then(() => {
              console.log("Image Uploaded");
            });
            getDownloadURL(
              ref(storage, `profileImages/${imageUpload.name}`)
            ).then(async (url) => {
              const taskRef = await addDoc(
                collection(db, `users/${user.uid}/profile`),
                { name: data.name, lastName: data.lastName, imageUrl: url }
              );
            });
          }
          reset();
        })}
      >
        <Grid container flexDirection="column" rowSpacing={2}>
          <Grid item>
            <TextField
              error={errors.name}
              id="standard-basic"
              fullWidth
              label="Name"
              variant="outlined"
              helperText={errors.name ? "Name required" : ""}
              {...register("name", { required: true })}
            />
          </Grid>
          <Grid item>
            <TextField
              error={errors.lastName}
              helperText={errors.lastName ? "Last name required" : ""}
              fullWidth
              id="standard-basic"
              label="Last Name"
              variant="outlined"
              {...register("lastName", { required: true })}
            />
          </Grid>
          <Grid item>
            <Grid item>
              <TextField
                type="file"
                variant="outlined"
                {...register("file", {
                  required: true,
                  onChange: (e) => setImageUpload(e.target.files[0]),
                })}
              />
            </Grid>
            <Button type="submit" variant="outlined" fullWidth>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default ProfileForm;
