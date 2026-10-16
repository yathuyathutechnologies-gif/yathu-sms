"use client";
import StaffSideBarMenu from "@/components/ui/staffSideMenu";
import styles from "./styles/staffportal.module.css";
import { usePathname } from "next/navigation";
import StaffTopAppBar from "@/components/ui/staffTopAppBar";
import { StaffPortalProvider, useStaffPortal } from "./StaffPortalContext";

import ActionScreen from "./actionsScreen";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function StaffPortalLayoutContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const {
        sidebarExpanded,
        toggleSidebar,
        mobileSidebarOpen,
        toggleMobileSidebar
    } = useStaffPortal();
    const pathname = usePathname();
    const isLoginPage = pathname === "/staffPortal";
    const mainContent = useRef(null);
    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 769px)", () => {
            const tl = gsap.timeline();
            tl.to(mainContent.current, {
                marginLeft: isLoginPage
                    ? "0px"
                    : sidebarExpanded
                        ? "20vw"
                        : "60px",
                ease: "power1.in",
                onComplete: () => {
                    ScrollTrigger.refresh();
                },
            });

            return () => tl.kill();
        });
        return () => mm.revert();
    }, [sidebarExpanded, mobileSidebarOpen, isLoginPage]);

    return (
        <div className={styles.staffPortal}>
            <ActionScreen />
            {!isLoginPage && <StaffSideBarMenu />}
            <main className={
                isLoginPage
                    ? styles.loginContent
                    : styles.content
            } ref={mainContent}>
                {!isLoginPage && <StaffTopAppBar />}
                {children}
            </main>
        </div>
    );
}