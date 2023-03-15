import { AppBar, Button, Toolbar, Typography, styled } from "@mui/material";
import { Container } from "@mui/system";
import { auth, logOut } from "../../services/firebase";
import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

// Responsive Navbar
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function NavBar() {
  const [user, loading, errors] = useAuthState(auth);
  return (
    <Container>
      <AppBar position="fixed" sx={{ backgroundColor: "#0D1AE9" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: "1" }}>
            To Do App
          </Typography>
          <Button variant="outlined">
            <Link to="/">Home</Link>
          </Button>
          <Button variant="outlined">
            <Link to={`/${user.uid}/profile`}>Profile</Link>
          </Button>
          <Button variant="outlined" onClick={() => logOut()}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Offset />
    </Container>
  );
}

export default NavBar;
