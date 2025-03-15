import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import LandingPage from "../pages/LandingPage";

const AppRoutes: React.FC = () => {
  const [login, setLogin] = React.useState<boolean>(false);

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>

      <Route path="/" element={<LandingPage />} />
      <Route
        path="/auth"
        element={
          login ? (
            <LoginForm login={login} setLogin={setLogin} />
          ) : (
            <SignupForm login={login} setLogin={setLogin} />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
