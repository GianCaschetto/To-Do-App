import { useForm } from "react-hook-form";
import { signIn, signUp } from "../../services/firebase";
import { Button, TextField, Grid, Typography, Box } from "@mui/material";

function SignInForm({ action }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    //Parent
    <Grid container justifyContent="center" alignItems="center">
      <form
        onSubmit={handleSubmit((data) => {
          if (action === "signin") {
            signIn(data);
          } else {
            signUp(data);
          }
        })}
      >
        {/* Title form */}
        <Grid item>
          <Typography
            component="h1"
            sx={{
              textAlign: "center",
              fontSize: "45px",
              fontFamily: "Arial",
              fontWeight: "700",
              margin: "10px",
            }}
          >
            Welcome! {action === "signin" ? "Sign In" : "Sign Up"}
          </Typography>
        </Grid>

        {/* User Credentials */}
        <Grid item>
          <TextField
            sx={{ marginBottom: "15px", width: "100%" }}
            {...register("email", { required: true, type: "email" })}
            placeholder="Email *"
            error={errors.email}
            helperText={errors.email ? "Email required" : ""}
          />
        </Grid>

        <Grid item>
          <TextField
            sx={{ marginBottom: "15px", width: "100%" }}
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 14,
            })}
            type="password"
            placeholder="Password *"
            error={errors.password}
            helperText={errors.password ? "Password required" : ""}
          />
        </Grid>

        {/* Submit Button */}
        <Grid item>
          <Button variant="contained" type="submit" sx={{ width: "100%" }}>
            {action === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default SignInForm;
