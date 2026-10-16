"use client";

import { useCallback, useEffect, useRef } from "react";
import { useStaffPortal } from "@/app/staffPortal/StaffPortalContext";

export const BaseUrl = "http://localhost:3001";

export function useApiFetch() {
    const {
        accessToken,
        setAccessToken,
        logout,
        setRoles,
        setPermissions,
        setUser,
        setTitle
    } = useStaffPortal();
    const accessTokenRef = useRef(accessToken);
    useEffect(() => {
        accessTokenRef.current = accessToken;
    }, [accessToken]);

    // this run when fecthing api fails
    // In context, /refresh run on page mount. or on every refresh
    const refreshAccessToken = useCallback(async () => {
        try {
            const response = await fetch(
                `${BaseUrl}/authentication/refresh`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                return null;
            }

            const result = await response.json();
            const data = result?.data;

            const newAccessToken = data?.accessToken;
            if (!newAccessToken) {
                return null;
            }

            const roles: string[] = data.roles ?? [];
            const permissions: string[] = data.permissions ?? [];


            if (roles.some((role) => ["lecturer", "admin"].includes(role))) {
                const title = roles.includes("admin")
                    ? "Administrator"
                    : roles.includes("lecturer")
                        ? "Lecturer"
                        : "Staff";
                setTitle(title);
                setRoles(roles);
                setPermissions(permissions);
                setUser({ firstName: data.firstName, lastName: data.lastName });
                return;
            }


            return newAccessToken;

        } catch (error) {
            console.error(
                "Failed to refresh access token:",
                error
            );

            return null;
        }
    }, [setAccessToken]);


    const apiFetch = useCallback(
        async (
            endpoint: string,
            options: RequestInit = {}
        ) => {

            const headers = new Headers(options.headers);

            const token = accessTokenRef.current;

            if (token) {
                headers.set(
                    "Authorization",
                    `Bearer ${token}`
                );
            }
            else {
                const newAccessToken = await refreshAccessToken();

                if (newAccessToken) {
                    headers.set(
                        "Authorization",
                        `Bearer ${newAccessToken}`
                    );
                }
            }

            let response = await fetch(
                `${BaseUrl}${endpoint}`,
                {
                    ...options,
                    headers,
                    credentials: "include",
                }
            );

            if (response.status !== 401) {

                return response;
            }

            const newAccessToken = await refreshAccessToken();

            if (!newAccessToken) {
                await logout();
                return response;
            }

            const retryHeaders = new Headers(options.headers);

            retryHeaders.set(
                "Authorization",
                `Bearer ${newAccessToken}`
            );

            response = await fetch(
                `${BaseUrl}${endpoint}`,
                {
                    ...options,
                    headers: retryHeaders,
                    credentials: "include",
                }
            );

            return response;
        },
        [
            refreshAccessToken,
            logout,
        ]
    );

    return apiFetch;
}