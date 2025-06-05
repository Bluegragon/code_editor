import React, { useState } from "react";
import { File, Home, Menu, Share, Star, X, PlayCircle, UserCircle } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import '../App.css'; // Ensure you have Tailwind CSS set up in your project
import { linearbackground } from "../customStyles";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`dark:bg-gray-800 bg-PrimaryColor dark:text-white px-2 pt-3.5 pb-1.5 shadow-md z-50`}>
      <div className="w-full flex justify-between items-center">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold">VirtualCop</span>
          {/* Run Button (Inspired by Replit) */}
        
        </div>

        {/* Right Section: Controls */}
        <div className="flex items-center gap-4">
          {/* Dark Mode */}
          <DarkModeToggle />
            <button style={linearbackground} className=" hover:bg-green-600 text-white text-sm px-3 py-1 rounded flex items-center gap-1 shadow">
            <PlayCircle size={18} />
            Run
          </button>

          {/* Profile Icon */}
          <button className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1.5 rounded-full transition-colors">
            <UserCircle size={22} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;