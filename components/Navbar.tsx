import { useState, useCallback, useEffect, Component } from "react";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import { useRouter } from "next/router";

import AccountMenu from "./AccountMenu";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import SearchResult from "./SearchResult";

const TOP_OFFSET = 66;
interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const handleSearch = () => {
    onSearch(searchQuery);
    console.log(searchQuery);
  };

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();

    router.push(`/searchResults?query=${searchQuery}`);
    <SearchResult />;
    console.log("Current Query: ", searchQuery);
  };

  return (
    <nav className="sticky w-full">
      <div
        className={`
          px-4
          md:px-16
          py-6
          flex
          flex-row
          items-center
          transition
          duration-500
          ${showBackground ? "bg-zinc-900 bg-opacity-90" : ""}`}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="relative">
            <button
              type="button"
              className="absolute top-2 right-2"
              onClick={handleSearch}
            >
              <BsSearch className="text-gray-200" />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 h-8 px-2 py-1 rounded-md bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="Profile Picture" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
