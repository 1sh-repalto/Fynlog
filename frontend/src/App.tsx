import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </Router>
  );
};

export default App;
