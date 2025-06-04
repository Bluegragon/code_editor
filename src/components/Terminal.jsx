import React, { useState, useRef, useEffect } from "react";

const Terminal = () => {
  const [logs, setLogs] = useState(["Welcome to the fake terminal!"]);
  const [input, setInput] = useState("");
  const [isTermanalOpen, setIsTerminalOpen] = useState(true);
  const toggleTerminal = () => setIsTerminalOpen(!isTermanalOpen);
//    useEffect(() => {
//       const handleKeydown = (e) => {
//         // Check for Ctrl + R
//         if (e.altKey && e.key.toLowerCase() === 'k') {
//           e.preventDefault(); // prevent browser refresh
//           toggleTerminal();
//           console.log("Terminal toggled");
//         }
//       };
  
//       window.addEventListener("keydown", handleKeydown);
//       return () => {
//         window.removeEventListener("keydown", handleKeydown);
//       };
//     }, []);
  const endRef = useRef(null);

  const handleCommand = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setLogs((prev) => [...prev, `> ${trimmed}`]);

      // Fake command responses
      switch (trimmed) {
        case "help":
          setLogs((prev) => [...prev, "Available commands: help, clear, echo"]);
          break;
        case "clear":
          setLogs([]);
          break;
        default:
          if (trimmed.startsWith("echo ")) {
            setLogs((prev) => [...prev, trimmed.slice(5)]);
          } else {
            setLogs((prev) => [...prev, `Unknown command: ${trimmed}`]);
          }
      }
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCommand();
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className={`${isTermanalOpen ? "h-64": "h-0"} duration-200 absolute bottom-0 w-[99%] bg-black text-green-400 font-mono flex flex-col border-t border-gray-700`}>
      <div className="flex-1 overflow-y-auto p-2 overflow-x-hidden text-sm space-y-1">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="border-t border-gray-700 p-2 bg-gray-900">
        <span className="text-green-500">$</span>
        <input
          className="bg-transparent outline-none ml-2 w-[90%] text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a command (try: help, echo Hello)"
        />
      </div>
    </div>
  );
};

export default Terminal;
