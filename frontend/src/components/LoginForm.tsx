import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-4/6 min-w-80 max-w-120  min-h-130 mx-auto mt-20 border border-gray-700 rounded-xl shadow-xl">
      <h2 className="text-4xl text-center p-5 h-1/6">Login</h2>

      <form
        onSubmit={handleSubmit}
        className="py-8 px-16 flex-col h-5/6 space-y-2"
      >
        <label htmlFor="email" className="block text-lg pl-2">
          Email
        </label>
        <input
          required
          id="email"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block border border-gray-500 rounded-md mb-6 w-full h-10 pl-2"
        />
        <label htmlFor="password" className="block text-lg pl-2">
          Password
        </label>
        <input
          required
          id="password"
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block border border-gray-500 rounded-md mb-12 w-full h-10 pl-2"
        />

        <button type="submit" className="border rounded-md h-10 w-full">
          Login
        </button>
      </form>

      <p className="text-center select-none">
        Don't have an account ?{" "}
        <a
          onClick={() => setLogin(false)}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
