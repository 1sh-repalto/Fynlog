import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { TransactionProvider } from "./context/TransactionContext";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <TransactionProvider>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={3000} theme="coloured"/>
        </TransactionProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
