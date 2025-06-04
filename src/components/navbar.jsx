import React, { useState } from "react";
import { File, Home, Menu, Share, Star, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import '../App.css'; // Ensure you have Tailwind CSS set up in your project

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks =[
    {
      name: "Home",
      href: "#home",
      icon:<Home size={12} />,
      isActive: true
    },
    {
      name: "Features",
      href: "#features",
      icon:<Star size={12} />,
      isActive: false

    },
    {
      name: "Repositories",
      href: "#repositories",
      icon:<Share size={12} />,
      isActive: false


    },
    {
      name: "Files",
      href: "#files",
      icon:<File size={12} />,
      isActive: false
    }
  ];
  const [links, setLinks] = useState(navLinks);

  return (
    <nav className={`dark:bg-gray-900 bg-PrimaryColor dark:text-white px-4 py-3 shadow-md`}>
      <div className="w-full  flex justify-between items-center">
        {/* Logo */}
      
        <div className="flex items-center gap-6">
           <div className="flex flex-row items-center gap-2">
         <div className=" shadow-2xl h-8 w-8 rounded-sm flex items-center justify-center " style={{background:'linear-gradient(to left, #008080, #00a693)'}}>
             <Menu size={24} color="white" />
          </div>
         
          <span className="text-xl font-bold">VirtualCop</span>
       </div>
           <ul className="hidden md:flex space-x-6">
          {links.map(link => (
            <li key={link.href} className={`hover:text-gray-300  gap-1.5 items-center flex flex-row text-xs  ${link.isActive ? "shadow-md linear-background dark:bg-gray-600":null} px-2 py-1 rounded-sm cursor-pointer`}>
              {link.icon}{link.name}
            </li>
          ))}
        </ul>
        </div>

        {/* Desktop Nav */}
       
   <DarkModeToggle/>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden mt-2 space-y-2 px-2">
          {navLinks.map(link => (
            <li
              key={link}
              className="hover:dark:bg-gray-800 p-2 rounded cursor-pointer"
            >
              {link}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
