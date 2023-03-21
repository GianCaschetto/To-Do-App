import { Box, Avatar, Typography, Container } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../services/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

function ProfileBox() {
  const [user, loading, error] = useAuthState(auth);
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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#4054B2",
        justifyContent: "center",
        alignItems: "center",
        height: "250px",
        mt: 2,
      }}
    >
      <Avatar
        alt="user-photo"
        src={userProfile?.imageUrl ?? null}
        sx={{ mb: 2, width: 100, height: 100 }}
      />
      <Box>
        {userProfile ? (
          <Typography component="h2" variant="h4">
            {`${userProfile.firstName} ${userProfile.lastName}`}
          </Typography>
        ) : null}
      </Box>
    </Container>
  );
}

export default ProfileBox;
