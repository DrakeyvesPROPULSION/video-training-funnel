import React, { createContext, useState, useContext, useCallback } from 'react';

// Create the context
const UIContext = createContext();

// Create a provider component
export function UIProvider({ children }) {
  const [showExitPopup, setShowExitPopup] = useState(false);

  const openExitPopup = useCallback(() => {
    console.log("Opening Exit Popup via context");
    setShowExitPopup(true);
  }, []);

  const closeExitPopup = useCallback(() => {
    console.log("Closing Exit Popup via context");
    setShowExitPopup(false);
  }, []);

  // Value provided to consuming components
  const value = {
    showExitPopup,
    openExitPopup,
    closeExitPopup,
    // Add state for other UI elements like loading indicators, notifications etc. if needed
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}

// Custom hook to use the UIContext
export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}