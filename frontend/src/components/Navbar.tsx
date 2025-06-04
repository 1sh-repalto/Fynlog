import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuth';
import { Menu, X } from 'lucide-react';
import DropDownMenu from './DropDownMenu';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { logoutUser } = useAuthStore();
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="h-16 px-20 flex justify-between items-center bg-lightDark shadow-[0_4px_12px_rgba(0,0,0,0.3)] sticky top-0 z-50">
      <div className="w-3/10 flex justify-start items-center">
        <h2 className="text-2xl w-3/10">MyApp</h2>
      </div>
      <div className="w-2/5 justify-between items-center hidden md:flex">
        <Link
          to="/home"
          className={`hover:bg-lighterDark h-10 w-auto px-2 rounded-sm flex justify-center items-center transition duration-200 ease-in-out ${
            location.pathname === '/home' && 'bg-lighterDark'
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/transactions"
          className={`hover:bg-lighterDark h-10 w-auto px-2 rounded-sm flex justify-center items-center transition duration-200 ease-in-out ${
            location.pathname === '/transactions' && 'bg-lighterDark'
          }`}
        >
          Transactions
        </Link>
        <Link
          to="/page3"
          className={`hover:bg-lighterDark h-10 w-auto px-2 rounded-sm flex justify-center items-center transition duration-200 ease-in-out ${
            location.pathname === '/page3' && 'bg-lighterDark'
          }`}
        >
          Page3
        </Link>
      </div>
      <div ref={menuRef} className="w-3/10 flex justify-end items-center relative">
        <button
          aria-label="Toggle dropdown menu"
          className={`h-12 w-12 flex justify-center items-center rounded-sm transition duration-200 ease-in-out hover:opacity-70 hover:bg-lighterDark ${
            dropdownMenu && 'bg-lighterDark'
          }`}
          onClick={() => setDropdownMenu((prev) => !prev)}
        >
          {dropdownMenu ? <X /> : <Menu />}
        </button>
        {dropdownMenu && (
          <DropDownMenu signOut={logoutUser} closeMenu={() => setDropdownMenu(false)} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
