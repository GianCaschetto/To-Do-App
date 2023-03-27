import { useForm } from "react-hook-form";
import { signIn, signUp, auth, resetPassword } from "../../services/firebase";
import { Button, TextField, Grid, Typography, Link } from "@mui/material";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useCallback, useState } from "react";

function SignInForm({ action }) {
  const [forgotPassword, setForgotPassword] = useState(false);
  const forgotHandleClick = useCallback(() => {
    setForgotPassword(!forgotPassword);
  });

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
          if (forgotPassword) {
            setForgotPassword(false);
            resetPassword(data);
          } else if (action === "signin") {
            signIn(data);
          } else if (action === "signup") {
            signUp(data);
          }
        })}
      >
        {/* Title form */}
        <Grid item>
          {forgotPassword ? (
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
              Reset Password
            </Typography>
          ) : (
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
          )}
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
        {forgotPassword ? null : (
          <>
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
          </>
        )}
        {forgotPassword ? (
          <Grid item>
            <Button variant="contained" type="submit" sx={{ width: "100%" }}>
              Send Email
            </Button>
          </Grid>
        ) : null}
        {/* Forgot Password button */}
        <Grid item sx={{ textAlign: "center" }}>
          <Button onClick={forgotHandleClick}>Forgot your password?</Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default SignInForm;
