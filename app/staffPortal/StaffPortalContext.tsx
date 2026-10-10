"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface StaffPortalContextType {
  // Authentication
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  logout: () => void;

  // Desktop sidebar
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  toggleSidebar: () => void;

  // Mobile sidebar
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;

  // more action blur layer
  actionToogleOpen: boolean;
  setActionToogleOpen: (open: boolean) => void;
  toggleActions: () => void;
}

const StaffPortalContext = createContext<
  StaffPortalContextType | undefined
>(undefined);

export function StaffPortalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const route = useRouter();

  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const saved = window.localStorage.getItem("sidebarExpanded");

    if (saved === null) {
      return true;
    }

    return saved === "true";
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [actionToogleOpen, setActionToogleOpen] = useState(false);

  const toggleActions = () => {
    setActionToogleOpen((prev) => !prev);
  };


  // Restore the user's session when the application starts.
  useEffect(() => {
    async function restoreSession() {
      try {
        const response = await fetch(
          "http://localhost:3001/authentication/refresh",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!response.ok) {
          setAccessToken(null);

          route.push("/staffPortal");
          return;
        }

        const result = await response.json();

        const newAccessToken = result?.data?.accessToken;

        if (!newAccessToken) {
          setAccessToken(null);
          return;
        }

        setAccessToken(newAccessToken);
      } catch (error) {
        console.error("Failed to restore session:", error);

        setAccessToken(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    restoreSession();
  }, []);


  //  Persist sidebar preference
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


  //  Logout. 
  //  The backend should invalidate the refresh token
  //  and clear the HttpOnly cookie.
  const logout = async () => {
    try {
      await fetch(
        "http://localhost:3001/authentication/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setAccessToken(null);

      route.push("/staffPortal");
    }
  };

  return (
    <StaffPortalContext.Provider
      value={{
        // Authentication
        accessToken,
        setAccessToken,
        isAuthenticated: accessToken !== null,
        isAuthLoading,
        logout,

        // Desktop
        sidebarExpanded,
        setSidebarExpanded,
        toggleSidebar,

        // Mobile
        mobileSidebarOpen,
        setMobileSidebarOpen,
        toggleMobileSidebar,

        // actionToogle
        actionToogleOpen,
        setActionToogleOpen,
        toggleActions
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