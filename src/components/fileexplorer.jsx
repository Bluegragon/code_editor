import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  RefreshCcw,
  Plus,
  FolderPlus,
  Minimize2,
} from "lucide-react";
import '../App.css'; // Ensure you have Tailwind CSS set up in your project
import { linearbackground } from "../customStyles";

const FileExplorer = ({ structure = [] }) => {
  const [data, setData] = useState(structure);
  const [refreshKey, setRefreshKey] = useState(0); // Triggers re-render
  const [collapsed, setCollapsed] = useState(false);
  const [showExplorer, setShowExplorer] = useState(true);


 useEffect(() => {
    const handleKeydown = (e) => {
      // Check for Ctrl + R
      if (e.ctrlKey && e.key.toLowerCase() === 'e') {
        e.preventDefault(); // prevent browser refresh
        setShowExplorer(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleAddFile = () => {
    setData(prev => [...prev, { type: "file", name: "NewFile.js" }]);
  };

  const handleAddFolder = () => {
    setData(prev => [
      ...prev,
      { type: "folder", name: "NewFolder", children: [] },
    ]);
  };

  const handleCollapseAll = () => { 
    setCollapsed(true);
    setTimeout(() => setCollapsed(false), 50); // Reset collapse state for next time
  };

  return (
    <div className={`dark:bg-gray-900 dark:text-white h-screen flex flex-col ${showExplorer ? "w-64": "w-0"} duration-300`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-gray-700 text-sm">
        <span className="font-semibold dark:text-gray-100 text-gray-100 px-2 py-1.5 flex items-center text-sm rounded-sm shadow-2xl" style={linearbackground}>Explorer</span>
        <div className="flex items-center gap-2">
          <button onClick={handleRefresh} title="Refresh">
            <RefreshCcw size={16} />
          </button>
          <button onClick={handleAddFile} title="Add File">
            <Plus size={16} />
          </button>
          <button onClick={handleAddFolder} title="Add Folder">
            <FolderPlus size={16} />
          </button>
          <button onClick={handleCollapseAll} title="Collapse All">
            <Minimize2 size={16} />
          </button>
        </div>
      </div>

      {/* Explorer Items */}
      <div className="overflow-auto p-2 flex-1" key={refreshKey}>
        {data.map((item, index) => (
          <ExplorerItem
            key={index}
            item={item}
            depth={0}
            collapseTrigger={collapsed}
          />
        ))}
      </div>
    </div>
  );
};

const ExplorerItem = ({ item, depth, collapseTrigger }) => {
  const [expanded, setExpanded] = useState(true);

  const isFolder = item.type === "folder";
  const hasChildren = isFolder && item.children?.length > 0;

  React.useEffect(() => {
    if (collapseTrigger) {
      setExpanded(false);
    }
  }, [collapseTrigger]);

  const toggleExpand = () => {
    if (isFolder) setExpanded(prev => !prev);
  };

  return (
    <div>
      <div
        className="flex items-center gap-2 cursor-pointer py-1 hover:bg-secondrycolor dark:hover:bg-gray-800 rounded"
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
        onClick={toggleExpand}
      >
        {hasChildren ? (
          expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
        ) : (
          <span className="w-4" />
        )}
        {isFolder ? (
          expanded ? <FolderOpen size={16} /> : <Folder size={16} />
        ) : (
          <FileText size={16} />
        )}
        <span>{item.name}</span>
      </div>

      {hasChildren && expanded && (
        <div>
          {item.children.map((child, index) => (
            <ExplorerItem
              key={index}
              item={child}
              depth={depth + 1}
              collapseTrigger={collapseTrigger}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
