import React, { useState } from "react";
import CodeEditor from "./codeEditor";
import Terminal from "./Terminal";
// import AIAgent from "./AIAgent"; // Placeholder for your AI agent
// import Preview from "./Preview"; // Placeholder for preview view
// import Docs from "./Docs"; // Placeholder for documentation/help view
import { File, X } from "lucide-react";
import { linearbackground } from "../customStyles";
import '../App.css';

const initialFiles = [
  {
    name: "App.js",
    language: "javascript",
    content: "console.log('Hello JS');",
  },
  {
    name: "index.html",
    language: "html",
    content: "<h1>Hello HTML</h1>",
  },
  {
    name: "style.css",
    language: "css",
    content: "body { background: #222; color: white; }",
  },
  {
    name: "script.py",
    language: "python",
    content: "print('Hello Python')",
  },
];

const viewModes = ["Editor", "Test", "AI Agent", "Preview", "Docs"];

export default function CodeEditorWithScreen() {
  const [files, setFiles] = useState(initialFiles);
  const [activeTab, setActiveTab] = useState(0);
  const [activeView, setActiveView] = useState("Editor");

  const getUpdatedFiles = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);

    if (newFiles.length === 0) {
      setActiveTab(0);
      return;
    }

    if (index === activeTab) {
      setActiveTab(index > 0 ? index - 1 : 0);
    } else if (index < activeTab) {
      setActiveTab((prev) => Math.max(prev - 1, 0));
    }
  };

  const updateFileContent = (newContent) => {
    const updatedFiles = [...files];
    updatedFiles[activeTab].content = newContent;
    setFiles(updatedFiles);
  };

  return (
    <div className=" w-full flex flex-col bg-gray-400/10 dark:bg-gray-900 text-white relative">
      {/* View Selector */}
      <div className="flex space-x-2 px-2 py-1.5  border-b border-gray-700">
        {viewModes.map((mode) => (
          <button
            key={mode}
            onClick={() => setActiveView(mode)}
            className={`px-4 py-1 text-sm rounded ${
              activeView === mode
                ? "text-white dark:text-white font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }`}
            style={activeView=== mode ? linearbackground:{}}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* File Tabs (only show in Editor view) */}
      {activeView === "Editor" && (
        <div className="flex px-2  border-gray-700 py-0.5 overflow-x-auto thin-scrollbar overflow-y-hidden">
          {files.map((file, index) => (
            <div key={index} className="flex items-center">
              <button
                onClick={() => setActiveTab(index)}
                className={`px-3 py-2 flex items-center text-xs ${
                  index === activeTab
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white font-semibold"
                    : " text-gray-500 dark:text-gray-300"
                }`}
              >
                <File size={12} className="mr-1" />
                {file.name}
                <X
                  size={15}
                  className="ml-1 cursor-pointer "
                  onClick={(e) => {
                    e.stopPropagation();
                    getUpdatedFiles(index);
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Area */}
      <div className="overflow-hidden flex flex-row justify-center relative h-full">
        {activeView === "Editor" && files.length > 0 && files[activeTab] ? (
          <div className="flex flex-col w-full h-full">
          <CodeEditor
            file={files[activeTab]}
            onChange={updateFileContent}
          />
           <Terminal />
          </div>
        ) : activeView === "Test" ? (
          <Terminal />
        ) : activeView === "AI Agent" ? (
          <AIAgent />
        ) : activeView === "Preview" ? (
          <Preview />
        ) : activeView === "Docs" ? (
          <Docs />
        ) : (
          <div className="flex items-center justify-center w-full text-gray-400 text-sm">
            No view selected
          </div>
        )}
      </div>
    </div>
  );
}
