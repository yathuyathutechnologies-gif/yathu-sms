"use client";

import { useCallback, useEffect, useRef } from "react";
import { useStaffPortal } from "@/app/staffPortal/StaffPortalContext";

export const BaseUrl = "http://localhost:3001";

export function useApiFetch() {
    const {
        accessToken,
        setAccessToken,
        logout,
    } = useStaffPortal();

    /*
     * Store the latest access token in a ref.
     *
     * Updating a ref does NOT cause a re-render.
     */
    const accessTokenRef = useRef(accessToken);

    /*
     * Keep the ref synchronized with React state.
     */
    useEffect(() => {
        accessTokenRef.current = accessToken;
    }, [accessToken]);

    /*
     * Refresh access token.
     */
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

            const newAccessToken =
                result?.data?.accessToken;

            if (!newAccessToken) {
                return null;
            }

            setAccessToken(newAccessToken);

            // Keep the ref immediately up to date.
            accessTokenRef.current = newAccessToken;

            return newAccessToken;

        } catch (error) {
            console.error(
                "Failed to refresh access token:",
                error
            );

            return null;
        }
    }, [setAccessToken]);

    /*
     * apiFetch is now stable.
     *
     * It does NOT depend on accessToken.
     */
    const apiFetch = useCallback(
        async (
            endpoint: string,
            options: RequestInit = {}
        ) => {
            const headers = new Headers(options.headers);

            /*
             * Always get the latest token from the ref.
             */
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

            /*
             * Original request.
             */
            let response = await fetch(
                `${BaseUrl}${endpoint}`,
                {
                    ...options,
                    headers,
                    credentials: "include",
                }
            );

            /*
             * Request succeeded or failed
             * for a non-authentication reason.
             */
            if (response.status !== 401) {
                return response;
            }

            /*
             * Token expired/invalid.
             * Try refreshing.
             */
            const newAccessToken =
                await refreshAccessToken();

            /*
             * Refresh failed.
             */
            if (!newAccessToken) {
                await logout();
                return response;
            }

            /*
             * Retry using the new token.
             */
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