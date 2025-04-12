import React from 'react';
import { useAuthStore } from '../store/useAuth';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuthStore();

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