import { LogOut, User, House, ArrowRightLeft, PiggyBank } from 'lucide-react';
import { Link } from 'react-router-dom';

const DropDownMenu: React.FC<{
  signOut: () => void;
  closeMenu: () => void;
  openUserProfile: () => void; // ✅ new prop
}> = ({ signOut, closeMenu, openUserProfile }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-[#303030] rounded shadow-lg z-50">
      <ul role="menu" className="py-2 px-2 space-y-4">
        <Link
          to="/dashboard"
          className="flex md:hidden px-4 py-2 rounded-sm hover:bg-[#424242] transition duration-200 ease-in-out cursor-pointer"
          onClick={closeMenu}
        >
          <House />
          <p className="ml-4">Dashboard</p>
        </Link>
        <Link
          to="/transactions"
          className="flex md:hidden px-4 py-2 rounded-sm hover:bg-[#424242] transition duration-200 ease-in-out cursor-pointer"
          onClick={closeMenu}
        >
          <ArrowRightLeft />
          <p className="ml-4">Transactions</p>
        </Link>

        <Link
          to="/budgets"
          className="flex md:hidden px-4 py-2 rounded-sm hover:bg-[#424242] transition duration-200 ease-in-out cursor-pointer"
          onClick={closeMenu}
        >
          <PiggyBank />
          <p className="ml-4">Budgets</p>
        </Link>

        <button
          onClick={() => {
            openUserProfile(); // ✅ open sidebar
            closeMenu(); // ✅ then close dropdown
          }}
          className="flex w-full px-4 py-2 rounded-sm hover:bg-[#424242] transition duration-200 ease-in-out cursor-pointer"
        >
          <User />
          <p className="ml-4">Profile</p>
        </button>

        <div
          role="menuitem"
          className="px-4 py-2 rounded-sm hover:bg-[#424242] transition duration-200 ease-in-out cursor-pointer flex"
          onClick={() => {
            closeMenu();
            signOut();
          }}
        >
          <LogOut />
          <p className="ml-4">Log out</p>
        </div>
      </ul>
    </div>
  );
};

export default DropDownMenu;
