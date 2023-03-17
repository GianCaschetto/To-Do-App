import { Box, Avatar, Typography } from "@mui/material";
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
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Avatar alt="user-photo" src={userProfile?.imageUrl ?? null} />
      {userProfile ? (
        <Typography>
          {`${userProfile.firstName} ${userProfile.lastName}`}
        </Typography>
      ) : null}
    </Box>
  );
}

export default ProfileBox;
