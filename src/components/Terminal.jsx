import React, { useState, useRef, useEffect } from "react";
import { X, Plus, Trash2, RotateCw } from "lucide-react";
import { useUIState } from "../providers/EditorProvider";

const TerminalInstance = ({ logs, setLogs, input, setInput }) => {
  const endRef = useRef(null);
  

  const handleCommand = () => {
    const trimmed = input.trim();
    if (trimmed) {
      const updatedLogs = [...logs, `$ ${trimmed}`];

      switch (trimmed) {
        case "help":
          updatedLogs.push("Available commands: help, clear, echo");
          break;
        case "clear":
          setLogs([]);
          setInput("");
          return;
        default:
          if (trimmed.startsWith("echo ")) {
            updatedLogs.push(trimmed.slice(5));
          } else {
            updatedLogs.push(`Unknown command: ${trimmed}`);
          }
      }

      setLogs(updatedLogs);
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand();
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="flex-1 overflow-y-auto p-3 text-sm space-y-1">
      {logs.map((log, i) => (
        <div key={i}>{log}</div>
      ))}
      <div className="flex">
        <span className="text-green-500 pr-2 select-none">$</span>
        <input
          className="bg-transparent outline-none w-full text-white placeholder-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command"
          autoFocus
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};

const Terminal = () => {
  const [terminals, setTerminals] = useState([
    { id: 1, logs: ["Welcome to the fake terminal!"], input: "" },
  ]);
  const [activeTerminalId, setActiveTerminalId] = useState(1);
  const [height, setHeight] = useState(300);
  const {terminalOpen,toggleTerminal,fileExplorerOpen}=useUIState();
  // const [isOpen, setIsOpen] = useState(terminalOpen);
  const dragging = useRef(false);

  const handleMouseDown = (e) => {
    dragging.current = true;
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (dragging.current) {
      const newHeight = window.innerHeight - e.clientY;
      setHeight(Math.max(newHeight, 150));
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const activeTerminal = terminals.find((t) => t.id === activeTerminalId);

  const updateActiveTerminal = (updates) => {
    setTerminals((prev) =>
      prev.map((t) =>
        t.id === activeTerminalId ? { ...t, ...updates } : t
      )
    );
  };

  const addTerminal = () => {
    const newId = terminals.length
      ? Math.max(...terminals.map((t) => t.id)) + 1
      : 1;
    setTerminals([
      ...terminals,
      { id: newId, logs: ["New terminal created."], input: "" },
    ]);
    setActiveTerminalId(newId);
  };

  const deleteTerminal = () => {
    const filtered = terminals.filter((t) => t.id !== activeTerminalId);
    setTerminals(filtered);
    if (filtered.length > 0) {
      setActiveTerminalId(filtered[0].id);
    }
  };

  const clearTerminal = () => {
    updateActiveTerminal({ logs: [] });
  };

  return (
    <div
      className={`${
        terminalOpen ? "fixed" : "hidden"
      } fixed bottom-0 ${fileExplorerOpen ? 'ml-2':null}  bg-gray-950 z-20 border-gray-200 dark:border-gray-600 border-t border-l  text-green-400 font-mono shadow-xl   flex flex-col`}
      style={{ height, width: fileExplorerOpen ? "calc(100vw - 16rem)" : "calc(100vw - 3.5rem)", }}
    >
      {/* Drag Bar */}
      <div
        onMouseDown={handleMouseDown}
        className="cursor-row-resize h-2 bg-gray-50 dark:bg-gray-900"
      />

      {/* Terminal Tabs and Actions */}
      <div className="flex items-center justify-between px-3 py-1 bg-gray-50 dark:bg-gray-900  border-b dark:border-gray-700 text-xs">
        <div className="flex gap-2">
          {terminals.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTerminalId(t.id)}
              className={`px-2 py-0.5 flex flex-row items-center justify-center gap-1 rounded ${
                t.id === activeTerminalId
                  ? "dark:bg-[#3d3d3d] bg-gray-200 text-gray-800 dark:text-white"
                  : "hover:bg-[#444]"
              }`}
            >
              Terminal {t.id}
              <X size={10}/>
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center text-gray-800 dark:text-white">
          <button
            onClick={addTerminal}
            className="hover:text-green-400"
            title="New Terminal"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={deleteTerminal}
            className="hover:text-red-400"
            title="Delete Terminal"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={clearTerminal}
            className="hover:text-yellow-400"
            title="Clear"
          >
            <RotateCw size={16} />
          </button>
          <button
            onClick={() => toggleTerminal()}
            className="hover:text-red-500"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      {activeTerminal && (
        <TerminalInstance
          logs={activeTerminal.logs}
          setLogs={(logs) => updateActiveTerminal({ logs })}
          input={activeTerminal.input}
          setInput={(input) => updateActiveTerminal({ input })}
        />
      )}
    </div>
  );
};

export default Terminal;
