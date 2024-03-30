import React from 'react'
import LandingPage from "./pages/LandingPage"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from './pages/LoginPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ForgotPass from './pages/ForgotPass';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/profile/:id",
    element: <ProfilePage />
  },
  {
    path: "//recoverPassword/:token",
    element: <ForgotPass />
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App