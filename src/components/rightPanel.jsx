import { FormInputIcon, Layout, Navigation2, Plus, PlusCircle, PlusCircleIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { linearbackground } from "../customStyles";
import { useUIState } from "../providers/EditorProvider";
import { uiComponents } from '../dummydata/index.jsx'
import CardComponent from "./cardComponent";
import '../App.css'

const RightPanel = () => {
  const {activeLayout, setActiveLayout} = useUIState();
  const [activeTab, setActiveTab] = useState("Layout");
  const [width, setWidth] = useState(300);
  const panelRef = useRef(null);
  const isResizing = useRef(false);
  const NavTable=[{
    name: "Layout",
    icon:<Layout size={15} />,
  },
{
    name: "Navigation",
    icon:<Navigation2 size={15} />,
  
},{
    name: "Forms",
    icon:<FormInputIcon size={15} />,
}
]

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing.current) {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth >= 200 && newWidth <= 600) {
          setWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const components = {
    Layout: <div className="p-4">Layout content goes here</div>,
    Navigation: <div className="p-4">Navigation content goes here</div>,
    Forms: <div className="p-4">Forms content goes here</div>,
  };

  return (
   <>
   {
    activeLayout && (
       <div
      ref={panelRef}
      className="fixed top-32 right-0 h-full bg-white dark:bg-gray-900 border-l border-gray-300 dark:border-gray-700 shadow-xl flex flex-col z-10"
      style={{ width }}
    >
      {/* Resize Handle */}
      <div
        className="absolute top-0 left-0 h-full w-1.5 cursor-col-resize z-50"
        onMouseDown={() => (isResizing.current = true)}
      />
      <div className=" flex flex-row justify-between items-center mx-2">
        <span className="dark:text-white text-gray-800 text-lg font-semibold p-2  w-full ">
          Components
        </span>
        <span className=" text-gray-800 dark:text-white">
          <PlusCircle size={20} />
        </span>
      </div>

      {/* Navigation Tabs */}
 <div className="grid grid-cols-3 gap-2 p-2 border-b dark:border-gray-700">
  {NavTable.map((tab) => (
    <button
      key={tab.name}
      onClick={() => setActiveTab(tab.name)}
      className={`
        px-2 py-2 rounded transition-colors font-medium flex flex-col justify-center items-center gap-1
        ${activeTab === tab.name
          ? "text-white"
          : "bg-gray-200 dark:bg-gray-800 dark:text-white"}
      `}
      style={activeTab === tab.name ? linearbackground : undefined}
    >
      {tab.icon}
      <span className="text-xs">{tab.name}</span>
    </button>
  ))}
</div>


      {/* Content */}
 <div className="flex flex-row flex-wrap items-center max-h-96 p-2 overflow-y-auto thin-scrollbar
 ">
  {
    uiComponents.map((component, index) => (
      <CardComponent key={index} label={component.name} icon={component.icon} />
    ))
  }
</div>

    </div>
    )
   }
   </>
  );
};

export default RightPanel;
