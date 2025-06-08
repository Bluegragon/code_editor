import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  RefreshCcw,
  Plus,
  FolderPlus,
  Minimize2,
} from "lucide-react";
import '../App.css';
import { useUIState } from "../providers/EditorProvider";

// Recursive helper to insert a file into the correct folder
const addFileToFolder = (tree, path, newFile) => {
  return tree.map(item => {
    if (item.type === "folder") {
      const currentPath = item._path; // _path is injected dynamically
      if (currentPath === path) {
        return {
          ...item,
          children: [...(item.children || []), newFile],
        };
      }
      if (item.children?.length) {
        return {
          ...item,
          children: addFileToFolder(item.children, path, newFile),
        };
      }
    }
    return item;
  });
};

const FileExplorer = ({ structure = [] }) => {
  const [data, setData] = useState(structure);
  const [refreshKey, setRefreshKey] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const { fileExplorerOpen } = useUIState();

  const handleRefresh = () => setRefreshKey(prev => prev + 1);

  const handleAddFile = () => {
    const newFile = { type: "file", name: "", isNew: true };
    if (selectedFolder) {
      setData(prev => addFileToFolder(prev, selectedFolder, newFile));
    } else {
      setData(prev => [...prev, newFile]);
    }
  };

  const handleAddFolder = () => {
    const newFolder = {
      type: "folder",
      name: "NewFolder",
      children: [],
    };
    if (selectedFolder) {
      setData(prev => addFileToFolder(prev, selectedFolder, newFolder));
    } else {
      setData(prev => [...prev, newFolder]);
    }
  };

  const handleCollapseAll = () => {
    setCollapsed(true);
    setTimeout(() => setCollapsed(false), 50);
  };

  return (
    <div className={`bg-gray-400/10 dark:bg-gray-900 dark:text-white h-screen flex flex-col ${fileExplorerOpen ? "w-56" : "w-0 hidden"} duration-300`}>
      <div className="flex items-center justify-between px-2 py-1 border-b border-gray-700 text-sm">
        <span className="font-semibold px-2 py-1.5 flex items-center text-sm">Explorer</span>
        <div className="flex items-center gap-2">
          <button onClick={handleRefresh}><RefreshCcw size={16} /></button>
          <button onClick={handleAddFile}><Plus size={16} /></button>
          <button onClick={handleAddFolder}><FolderPlus size={16} /></button>
          <button onClick={handleCollapseAll}><Minimize2 size={16} /></button>
        </div>
      </div>
      <div className="overflow-auto p-2 flex-1" key={refreshKey}>
        {data.map((item, index) => (
          <ExplorerItem
            key={index}
            item={item}
            depth={0}
            collapseTrigger={collapsed}
            currentPath={item.name}
            setSelectedFolder={setSelectedFolder}
            updateTree={setData}
          />
        ))}
      </div>
    </div>
  );
};

const ExplorerItem = ({ item, depth, collapseTrigger, currentPath, setSelectedFolder, updateTree }) => {
  const [expanded, setExpanded] = useState(true);
  const [isRenaming, setIsRenaming] = useState(item.isNew || false);
  const [tempName, setTempName] = useState(item.name);

  const isFolder = item.type === "folder";
  const hasChildren = isFolder && item.children?.length > 0;

  useEffect(() => {
    if (collapseTrigger) setExpanded(false);
  }, [collapseTrigger]);

  const toggleExpand = () => {
    if (isFolder) {
      setExpanded(!expanded);
      setSelectedFolder(currentPath); // Update selected folder path
    }
  };

  const handleRename = (e) => {
    e.preventDefault();
    if (!tempName.trim()){
      setIsRenaming(false);
      return;
    }

    const renameInTree = (tree) =>
      tree.map((node) => {
        if (node === item) {
          return { ...node, name: tempName, isNew: false };
        } else if (node.children) {
          return { ...node, children: renameInTree(node.children) };
        }
        return node;
      });

    updateTree(prev => renameInTree(prev));
    setIsRenaming(false);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setIsRenaming(true);
  };

  // Attach path to item so we can track it
  item._path = currentPath;

  return (
    <div onContextMenu={handleContextMenu}>
      <div
        className="flex items-center gap-1 cursor-pointer py-1 hover:bg-secondrycolor dark:hover:bg-gray-800 rounded"
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
        onClick={toggleExpand}
      >
        {hasChildren ? (expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />) : <span className="w-4" />}
        {isFolder ? (expanded ? <FolderOpen size={16} /> : <Folder size={16} />) : <File size={16} />}
      {isRenaming ? (
  <form onSubmit={handleRename}>
    <input
      autoFocus
      value={tempName}
      onChange={(e) => setTempName(e.target.value)}
      onBlur={handleRename}
      className="text-xs bg-transparent border border-gray-400 focus:outline outline-1 outline-blue-500 px-1 rounded-sm w-32"
    />
  </form>
) : (
  <span className="text-xs">{item.name}</span>
)}
      </div>

      {hasChildren && expanded && (
        <div>
          {item.children.map((child, index) => (
            <ExplorerItem
              key={index}
              item={child}
              depth={depth + 1}
              collapseTrigger={collapseTrigger}
              currentPath={`${currentPath}/${child.name}`}
              setSelectedFolder={setSelectedFolder}
              updateTree={updateTree}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
