import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import AuthPage from "../pages/AuthPage";
import Layout from "../components/Layout";

const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
