import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <nav>
      <h2>My App</h2>
      {user ? (
        <button onClick={signOut}>Logout</button>
      ) : (
        <p>Please log in</p>
      )}
    </nav>
  );
};

export default Navbar;