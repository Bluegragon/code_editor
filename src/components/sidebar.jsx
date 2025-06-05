
import React, { useState } from "react";
import { Home, User, Settings, Menu, File, Terminal, Folder, GitBranch } from "lucide-react";
import { useUIState } from "../providers/EditorProvider";

const Sidebar = ({content}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleTerminal, toggleFileExplorer } = useUIState();

  // const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex max-h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`dark:bg-gray-800 bg-primarycolor flex flex-col justify-between   dark:text-white p-2  duration-300  ${isOpen ? "w-64" : "w-14"} relative`}>
        {/* <button
          // onClick={toggleSidebar}
          className="absolute top-4 right-5 dark:text-white focus:outline-none"
        >
          <Menu />
        </button> */}
        <div className="flex flex-col  mt-1 items-center ">
         <SidebarItem icon={<Home size={20} />} label="Home" isOpen={isOpen} />
        </div>

        <div className="flex flex-col gap-6 items-center ">
          <SidebarItem icon={<Folder size={20} />} label="Home" isOpen={isOpen} onClicked={toggleFileExplorer} />
          <SidebarItem icon={<Terminal size={20} />} label="Profile" isOpen={isOpen} onClicked={toggleTerminal} />
          <SidebarItem icon={<GitBranch size={20} />} label="Settings" isOpen={isOpen} />
        </div>
         <div className="flex flex-col items-center ">
         <SidebarItem icon={<Settings size={20} />} label="Home" isOpen={isOpen} />
        </div>
      </div>

      {/* Main content */}
     {content}
    </div>
  );
};

const SidebarItem = ({ icon, label, isOpen,onClicked }) => (
  <div className="flex items-center gap-y-4 h-8 w-8 justify-center p-1 rounded-sm hover:shadow-xs shadow-gray-500 cursor-pointer" onClick={onClicked}>
    {icon}
    {isOpen && <span className="text-sm">{label}</span>}
  </div>
);

export default Sidebar;
