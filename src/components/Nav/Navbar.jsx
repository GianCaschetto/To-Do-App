import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  styled,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { auth, db, logOut } from "../../services/firebase";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc, doc } from "firebase/firestore";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

// Responsive Navbar
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function NavBar() {
  const [user, loading, errors] = useAuthState(auth);

  //Menu display
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Profile data
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    if (user) {
      getDoc(doc(db, `users/${user.uid}`)).then((doc) => {
        const profileData = doc.data();
        setUserProfile(profileData);
      });
    }
  }, [user]);
  return (
    <Container>
      <AppBar position="fixed" sx={{ backgroundColor: "#0D1AE9" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: "1" }}>
            To Do App
          </Typography>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar
              alt="user-photo"
              src={userProfile?.imageUrl ?? null}
              sx={{ width: 56, height: 56 }}
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Container
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <StickyNote2Icon sx={{ mr: 2 }} />
                  Tasks
                </Container>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to={`/${user.uid}/profile`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Container>
                  <PersonIcon sx={{ mr: 2 }} />
                  Profile
                </Container>
              </Link>
            </MenuItem>
            <MenuItem onClick={() => logOut()}>
              <Container>
                <LogoutIcon sx={{ mr: 2 }} />
                Log Out
              </Container>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Offset />
    </Container>
  );
}

export default NavBar;
