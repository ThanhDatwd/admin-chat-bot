import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'src/hooks/use-pathname';

// Context structure

const SidebarContext = createContext(null);
export const SidebarProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const pathname = usePathname();

  // Toggle the sidebar collapsed state
  const toggleSidebarCollapsed = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Handle hover state persistence on route changes
  useEffect(() => {
    if (isSidebarCollapsed) {
      setIsSidebarHovered(false);
    }
  }, [pathname, isSidebarCollapsed]);

  // Toggle hover state
  const toggleSidebarHover = (hovered) => {
    if (isSidebarCollapsed) {
      setIsSidebarHovered(hovered);
    }
  };
  return (
    <SidebarContext.Provider
      value={{
        isSidebarCollapsed,
        isSidebarHovered,
        toggleSidebarCollapsed,
        toggleSidebarHover,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useSidebarContext = () => useContext(SidebarContext);
