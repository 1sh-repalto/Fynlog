import { LogOut, User, House } from "lucide-react";

const DropDownMenu: React.FC<{ signOut: () => void; closeMenu: () => void; }> = ({ signOut, closeMenu }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-[#303030] rounded shadow-lg z-50">
      <ul role="menu" className="py-2 px-2 space-y-2">
        <li onClick={closeMenu} className="flex md:hidden px-4 py-2 rounded-sm hover:bg-[#424242] transition duration-200 ease-in-out cursor-pointer">
          <House />
          <p className="ml-3">Home</p>
        </li>
        <li onClick={closeMenu} className="block md:hidden px-4 py-2 rounded-sm hover:bg-[#424242] transition duration-200 ease-in-out cursor-pointer">
          Page2
        </li>
        <li onClick={closeMenu} className="block md:hidden px-4 py-2 rounded-sm hover:bg-[#424242] transition duration-200 ease-in-out cursor-pointer">
          Page3
        </li>
        <li
          onClick={closeMenu}
          role="menuitem"
          className="px-4 py-2 rounded-sm hover:bg-[#424242] transition duration-200 ease-in-out cursor-pointer flex"
        >
          <User />
          <p className="ml-3">Profile</p>
        </li>
        <li
          role="menuitem"
          className="px-4 py-2 rounded-sm hover:bg-[#424242] transition duration-200 ease-in-out cursor-pointer flex"
          onClick={() => {
            closeMenu();
            signOut();
          }}
        >
          <LogOut />
          <p className="ml-3">Log out</p>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;
