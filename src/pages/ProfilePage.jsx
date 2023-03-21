import React from "react";
import NavBar from "../components/Nav/Navbar";
import ProfileBox from "../components/ProfileBox";
import ProfileForm from "../components/ProfileForm";
import { storage } from "../services/firebase";

function ProfilePage() {
  return (
    <>
      <NavBar />
      <ProfileBox />
      <ProfileForm />
    </>
  );
}

export default ProfilePage;
