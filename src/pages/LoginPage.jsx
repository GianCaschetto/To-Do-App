import { Button, Grid } from "@mui/material";
import { useState, useCallback } from "react";
import SignInForm from "../components/Auth/SignInForm";

function LoginPage() {
  const [action, setAction] = useState("signin");
  const handleClick = useCallback(() => {
    if (action === "signin") {
      setAction("signup");
    } else {
      setAction("signin");
    }
  });

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(320deg, #c200d9 0, #9b03c8 16.67%, #7302b3 33.33%, #48009b 50%, #110082 66.67%, #00006b 83.33%, #000056 100%)",
      }}
    >
      <SignInForm action={action} />

      <Button variant="text" sx={{ marginTop: "10px" }} onClick={handleClick}>
        {action === "signin" ? "Create an account" : "Sign In"}
      </Button>
    </Grid>
  );
}

export default LoginPage;
