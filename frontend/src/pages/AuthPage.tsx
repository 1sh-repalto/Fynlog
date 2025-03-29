import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
  const [login, setLogin] = useState<boolean>(false);

  return login ? (
    <LoginForm login={login} setLogin={setLogin} />
  ) : (
    <SignupForm login={login} setLogin={setLogin} />
  );
};

export default AuthPage;
