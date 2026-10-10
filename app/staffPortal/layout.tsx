"use client";
import StaffSideBarMenu from "@/components/ui/staffSideMenu";
import styles from "./styles/staffportal.module.css";
import { usePathname } from "next/navigation";
import StaffTopAppBar from "@/components/ui/staffTopAppBar";
import { StaffPortalProvider } from "./StaffPortalContext";
import { X } from "lucide-react";
import ActionScreen from "./actionsScreen";
import StaffPortalLayoutContent from "./staffPortalLayoutContent";

export default function StaffPortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <StaffPortalProvider>
            <StaffPortalLayoutContent>
                {children}
            </StaffPortalLayoutContent>
        </StaffPortalProvider>
    );
}