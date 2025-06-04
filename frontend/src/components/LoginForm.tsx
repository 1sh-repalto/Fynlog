import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuth';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { loginUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginUser({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-dark bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_6rem]">
      <div className="w-4/6 min-w-80 max-w-120 min-h-150 mx-auto mt-20 text-neutral bg-transparent">
        <h2 className="text-4xl md:text-6xl text-center font-bold p-5 h-1/6">Login</h2>

        <form onSubmit={handleSubmit} className="py-8 px-16 flex-col h-5/6 space-y-2">
          <input
            required
            id="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block bg-neutral-800 rounded-md mb-6 w-full h-10 p-6 outline-none border border-transparent focus:border-neutral"
          />
          <input
            required
            id="password"
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block bg-neutral-800 rounded-md mb-6 w-full h-10 p-6 outline-none border border-transparent focus:border-neutral"
          />

          <button
            type="submit"
            className="border border-secondary text-secondary text-lg font-medium rounded-md h-12 w-full px-6 mt-6 hover:bg-secondary hover:text-neutral hover:drop-shadow-[0px_0px_8px_rgba(39,174,96,0.8)] active:drop-shadow-none active:bg-[#208049] transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center select-none">
          Don't have an account ?{' '}
          <a
            onClick={() => setLogin(false)}
            className="text-accent cursor-pointer hover:underline hover:drop-shadow-[0px_0px_10px_rgba(88,144,203,0.8)] active:drop-shadow-none"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
