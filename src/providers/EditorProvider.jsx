import React, { createContext, useContext, useState } from 'react';

// Create context
const UIStateContext = createContext();

// Create provider
export const UIStateProvider = ({ children }) => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [fileExplorerOpen, setFileExplorerOpen] = useState(true);

  const toggleTerminal = () => {setTerminalOpen(prev => !prev)
    console.log("heelo")


  };
  const toggleFileExplorer = () => setFileExplorerOpen(prev => !prev);

  return (
    <UIStateContext.Provider value={{
      terminalOpen,
      fileExplorerOpen,
      setTerminalOpen,
      setFileExplorerOpen,
      toggleTerminal,
      toggleFileExplorer,
    }}>
      {children}
    </UIStateContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUIState = () => useContext(UIStateContext);
