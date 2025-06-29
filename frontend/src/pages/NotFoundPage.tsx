import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-warning mb-6">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="mb-8 text-lg text-neutral-400">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-secondary text-neutral px-6 py-2 rounded-md text-lg font-semibold hover:bg-[#208049] transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFoundPage;
