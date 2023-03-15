import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import { Container } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import LoginPage from "../../pages/LoginPage";
import ProfilePage from "../../pages/ProfilePage";

const router = createBrowserRouter([
  //Usuario logueado
  {
    path: "/",
    element: (
      <Container>
        <Outlet />
      </Container>
    ),
    errorElement: <h1>Error xd</h1>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ":userId/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

function NavStack() {
  const [user, loading, error] = useAuthState(auth);
  return user ? <RouterProvider router={router} /> : <LoginPage />;
}

export default NavStack;
