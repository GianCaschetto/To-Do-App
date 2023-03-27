import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { db, auth } from "../services/firebase";
import { setDoc, doc } from "firebase/firestore";
import { storage } from "../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import ProfileBox from "./ProfileBox";

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
    <Container sx={{ mt: 5, mb: 5, width: "70%" }}>
      <Typography sx={{ textAlign: "center", mb: 2 }}>
        Personal information
      </Typography>
      <Grid container textAlign="center" justifyContent="center">
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
                      age: data.age,
                      gender: data.gender,
                      imageUrl: url,
                    },
                    { merge: true }
                  );
                });
            }
            reset();
          })}
        >
          <Grid container flexDirection="row" rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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
            <Grid item xs={6}>
              <TextField
                type="number"
                error={errors.age}
                helperText={errors.age ? "Age required" : ""}
                fullWidth
                id="standard-basic"
                label="Age"
                variant="outlined"
                {...register("age", { required: true, max: 99, min: 10 })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                defaultValue="male"
                error={errors.gender}
                helperText={errors.gender ? "Gender required" : ""}
                fullWidth
                id="standard-basic"
                label="Gender"
                variant="outlined"
                {...register("gender", { required: true })}
              >
                <MenuItem key={crypto.randomUUID()} value="male">
                  Male
                </MenuItem>
                <MenuItem key={crypto.randomUUID()} value="female">
                  Female
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="file"
                variant="outlined"
                {...register("file", {
                  required: true,
                  onChange: (e) => setImageUpload(e.target.files[0]),
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="outlined" sx={{ width: "40%" }}>
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
