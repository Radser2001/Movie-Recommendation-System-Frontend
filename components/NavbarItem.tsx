import React from "react";

interface NavbarItemProps {
  label: string;
  active?: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active }) => {
  return (
    <div
      className={
        active
          ? "text-white text-center cursor-default text-lg mr-2 "
          : "text-gray-200 text-center text-lg mr-2  hover:text-gray-300 cursor-pointer transition"
      }
    >
      {label}
    </div>
  );
};

export default NavbarItem;
