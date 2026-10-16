
"use client";

import { useRouter } from "next/navigation";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

interface User {
    firstName: string;
    lastName: string;
}

interface StaffPortalContextType {
    // Authentication
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    logout: () => Promise<void>;

    // Desktop sidebar
    sidebarExpanded: boolean;
    setSidebarExpanded: (expanded: boolean) => void;
    toggleSidebar: () => void;

    // Mobile sidebar
    mobileSidebarOpen: boolean;
    setMobileSidebarOpen: (open: boolean) => void;
    toggleMobileSidebar: () => void;

    // Actions
    actionToogleOpen: boolean;
    setActionToogleOpen: (open: boolean) => void;
    toggleActions: () => void;

    // Authorization
    permissions: string[];
    setPermissions: (permissions: string[]) => void;
    roles: string[];
    setRoles: (roles: string[]) => void;
    hasRole: (role: string) => boolean;
    hasPermission: (permission: string) => boolean;

    // User
    user: User | null;
    setUser: (user: User | null) => void;
    title: string | null;
    setTitle: (title: string) => void;

}

const StaffPortalContext =
    createContext<StaffPortalContextType | undefined>(undefined);

const BaseUrl = "http://localhost:3001";

export function StaffPortalProvider({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();

    // Sidebar
    const [sidebarExpanded, setSidebarExpanded] =
        useState<boolean>(() => {
            if (typeof window === "undefined") return true;

            const saved =
                window.localStorage.getItem("sidebarExpanded");

            return saved === null ? true : saved === "true";
        });

    const [mobileSidebarOpen, setMobileSidebarOpen] =
        useState(false);

    const [actionToogleOpen, setActionToogleOpen] =
        useState(false);

    // Authentication
    const [accessToken, setAccessToken] =
        useState<string | null>(null);

    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // Authorization
    const [roles, setRoles] = useState<string[]>([]);
    const [permissions, setPermissions] = useState<string[]>([]);

    // User
    const [user, setUser] = useState<User | null>(null);
    const [title, setTitle] = useState<string | null>(null);

    // Clear all authentication-related state.
    const clearSession = () => {
        setAccessToken(null);
        setRoles([]);
        setPermissions([]);
        setUser(null);
        setTitle(null)
    };


    // Restore session on initial mount.
    useEffect(() => {
        let active = true;

        async function restoreSession() {
            try {
                const response = await fetch(
                    `${BaseUrl}/authentication/refresh`,
                    {
                        method: "POST",
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    if (active) {
                        clearSession();
                        router.replace("/staffPortal");
                    }
                    return;
                }

                const result = await response.json();
                const data = result?.data;

                const newAccessToken = data?.accessToken;

                if (
                    !newAccessToken ||
                    !Array.isArray(data?.roles) ||
                    !Array.isArray(data?.permissions)
                ) {
                    if (active) {
                        clearSession();
                        router.replace("/staffPortal");
                    }
                    return;
                }

                if (!active) return;
                setAccessToken(newAccessToken);

                // Restore roles and permissions from the API response.
                setRoles(data.roles);
                setPermissions(data.permissions);

                // Determine the user's title from the returned roles.
                const restoredRoles: string[] = data.roles;

                const restoredTitle = restoredRoles.includes("admin")
                    ? "Administrator"
                    : restoredRoles.includes("lecturer")
                        ? "Lecturer"
                        : "Staff";

                setTitle(restoredTitle);

                // Restore the user's information.
                setUser({
                    firstName: data.firstName ?? "",
                    lastName: data.lastName ?? ""
                })

                return

            } catch (error) {
                console.error(
                    "Failed to restore session:",
                    error
                );

                if (active) {
                    clearSession();
                    router.replace("/staffPortal");
                }
            } finally {
                if (active) {
                    setIsAuthLoading(false);
                }
            }
        }

        restoreSession();

        return () => {
            active = false;
        };
    }, [router]);

    // Persist sidebar preference.
    useEffect(() => {
        window.localStorage.setItem(
            "sidebarExpanded",
            String(sidebarExpanded)
        );
    }, [sidebarExpanded]);

    // Sidebar actions.
    const toggleSidebar = () => {
        setSidebarExpanded((prev) => !prev);
    };

    const toggleMobileSidebar = () => {
        setMobileSidebarOpen((prev) => !prev);
    };

    const toggleActions = () => {
        setActionToogleOpen((prev) => !prev);
    };

    // Authorization checks.
    const hasPermission = (permission: string) =>
        permissions.includes(permission);

    const hasRole = (role: string) =>
        roles.includes(role);

    // Logout.
    const logout = async () => {
        try {
            await fetch(`${BaseUrl}/authentication/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout request failed:", error);
        } finally {
            clearSession();
            router.replace("/staffPortal");
        }
    };

    return (
        <StaffPortalContext.Provider
            value={{
                accessToken,
                setAccessToken,
                isAuthenticated: accessToken !== null,
                isAuthLoading,
                logout,

                sidebarExpanded,
                setSidebarExpanded,
                toggleSidebar,

                mobileSidebarOpen,
                setMobileSidebarOpen,
                toggleMobileSidebar,

                actionToogleOpen,
                setActionToogleOpen,
                toggleActions,

                permissions,
                setPermissions,
                roles,
                setRoles,
                hasRole,
                hasPermission,

                user,
                setUser,
                title,
                setTitle
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