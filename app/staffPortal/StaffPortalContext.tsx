"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface StaffPortalContextType {
  // Desktop sidebar
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  toggleSidebar: () => void;

  // Mobile sidebar
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
}

const StaffPortalContext = createContext<
  StaffPortalContextType | undefined
>(undefined);

export function StaffPortalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(() => {
    // localStorage doesn't exist during server rendering.
    if (typeof window === "undefined") {
      return true;
    }

    const saved = window.localStorage.getItem("sidebarExpanded");


    // No saved preference → expanded by default.
    if (saved === null) {
      return true;
    }

    // Restore saved preference.
    return saved === "true";
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(
      "sidebarExpanded",
      String(sidebarExpanded)
    );
  }, [sidebarExpanded]);

  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  return (
    <StaffPortalContext.Provider
      value={{
        // Desktop
        sidebarExpanded,
        setSidebarExpanded,
        toggleSidebar,

        // Mobile
        mobileSidebarOpen,
        setMobileSidebarOpen,
        toggleMobileSidebar,
      }}
    >
      {children}
    </StaffPortalContext.Provider>
  );
}

export function useStaffPortal() {
  const context = useContext(StaffPortalContext);

  if (!context) {
    throw new Error(
      "useStaffPortal must be used inside StaffPortalProvider"
    );
  }

  return context;
}