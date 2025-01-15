import React, { createContext, useContext, useState } from "react";

export type UIContextType = {
  isOpen: boolean;
  sidebarToggleManager: {
    state: boolean;
    updater: (x?: boolean) => void;
  };
};

export const UIContext = createContext<UIContextType | null>(null);

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUIContext must be used within a UIContextProvider");
  }
  return context;
};

export const UIContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isSBToggleOpen, setIsSBToggleOpen] = useState(false);

  const toggleSB = (SBControlBool?: boolean) => {
    if (SBControlBool !== undefined) {
      setIsSBToggleOpen(SBControlBool);
      return;
    }
    setIsSBToggleOpen((prev) => !prev);
  };

  const sidebarToggleManager = {
    state: isSBToggleOpen,
    updater: toggleSB,
  };

  return (
    <UIContext.Provider
      value={{ isOpen, sidebarToggleManager }}
    >
      {children}
    </UIContext.Provider>
  );
};
