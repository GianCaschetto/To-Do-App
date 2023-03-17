import { Button, Container, Grid, TextField } from "@mui/material";
import { db, auth } from "../services/firebase";
import { setDoc, doc } from "firebase/firestore";
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
    <Container sx={{ mt: 10 }}>
      <Grid container textAlign="center">
        <form
          onSubmit={handleSubmit(async (data) => {
            if (imageUpload) {
              const storageRef = ref(
                storage,
                `profile_images/${imageUpload.name}`
              );
              uploadBytes(storageRef, imageUpload)
                .then(() => {
                  return getDownloadURL(storageRef);
                })
                .then((url) => {
                  return setDoc(
                    doc(db, `users/${user.uid}`),
                    {
                      firstName: data.firstName,
                      lastName: data.lastName,
                      imageUrl: url,
                    },
                    { merge: true }
                  );
                });
            }
            reset();
          })}
        >
          <Grid container flexDirection="column" rowSpacing={2}>
            <Grid item>
              <TextField
                error={errors.firstName}
                id="standard-basic"
                fullWidth
                label="First name"
                variant="outlined"
                helperText={errors.firstName ? "Name required" : ""}
                {...register("firstName", { required: true })}
              />
            </Grid>
            <Grid item>
              <TextField
                error={errors.lastName}
                helperText={errors.lastName ? "Last name required" : ""}
                fullWidth
                id="standard-basic"
                label="Last name"
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
    </Container>
  );
}

export default ProfileForm;
