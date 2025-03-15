import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import LandingPage from "./pages/LandingPage";

const App: React.FC = () => {
  const [login, setLogin] = React.useState<boolean>(false);

  return (
    <Router>
      <AuthProvider>
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
      </AuthProvider>
    </Router>
  );
};

export default App;
