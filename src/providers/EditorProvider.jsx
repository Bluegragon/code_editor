import React, { createContext, useContext, useState } from 'react';

// Create context
const UIStateContext = createContext();

// Create provider
export const UIStateProvider = ({ children }) => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [fileExplorerOpen, setFileExplorerOpen] = useState(true);
  const [activeLayout, setActiveLayout] = useState(false);

  const toggleTerminal = () => {setTerminalOpen(prev => !prev)
    console.log("heelo")


  };
  const toggleFileExplorer = () => setFileExplorerOpen(prev => !prev);
  const toggleActiveLayout = () => setActiveLayout(prev => !prev);
  return (
    <UIStateContext.Provider value={{
      terminalOpen,
      fileExplorerOpen,
      setTerminalOpen,
      setFileExplorerOpen,
      toggleTerminal,
      toggleFileExplorer,
      activeLayout,
     toggleActiveLayout
    }}>
      {children}
    </UIStateContext.Provider>
  );
};

// Custom hook for consuming the context
export const useUIState = () => useContext(UIStateContext);
