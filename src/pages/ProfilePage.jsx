import React from "react";
import NavBar from "../components/Nav/Navbar";
import ProfileForm from "../components/ProfileForm";
import { storage } from "../services/firebase";

function ProfilePage() {
  return (
    <>
      <NavBar />
      <ProfileForm />
    </>
  );
}

export default ProfilePage;
