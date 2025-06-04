
import React, { useState } from "react";
import { Home, User, Settings, Menu, File, Terminal, Folder } from "lucide-react";

const Sidebar = ({content}) => {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`dark:bg-gray-800 bg-primarycolor   dark:text-white h-screen p-5 pt-8 duration-300 shadow-md ${isOpen ? "w-64" : "w-14"} relative`}>
        <button
          // onClick={toggleSidebar}
          className="absolute top-4 right-5 dark:text-white focus:outline-none"
        >
          <Menu />
        </button>

        <div className="flex flex-col gap-6 mt-12">
          <SidebarItem icon={<Folder size={20} />} label="Home" isOpen={isOpen} />
          <SidebarItem icon={<Terminal size={20} />} label="Profile" isOpen={isOpen} />
          <SidebarItem icon={<Settings size={20} />} label="Settings" isOpen={isOpen} />
        </div>
      </div>

      {/* Main content */}
     {content}
    </div>
  );
};

const SidebarItem = ({ icon, label, isOpen }) => (
  <div className="flex items-center gap-y-4 hover:bg-gray-700 rounded cursor-pointer">
    {icon}
    {isOpen && <span className="text-sm">{label}</span>}
  </div>
);

export default Sidebar;
