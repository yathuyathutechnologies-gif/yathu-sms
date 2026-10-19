"use client";

import { usePathname } from "next/navigation";
import styles from "./styles/roles.module.css";
import { useLayoutEffect, useRef, useState } from "react";
import TableDisplay from "@/components/ui/tableDisplay";
import StudentIcon from "@/components/icons/StudentIcon";
import { PlusCircle, UserPlus2Icon } from "lucide-react";
import PermissionsGuard from "../../permissionsGuad";
import AddButton from "@/components/ui/addButton";
import AddEntity from "@/components/ui/addEntity";
import { useStaffPortal } from "../../StaffPortalContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MoreButtons from "@/components/ui/moreButton";
import ExamIcon from "@/components/icons/ExamIcon";

gsap.registerPlugin(ScrollTrigger);
const Roles = () => {
    const path = usePathname();
    const { toggleActions, actionToogleOpen, isAuthLoading } = useStaffPortal();
    const [showAddEntityToggle, setShowAddEntityToggle] = useState<boolean>(false)
    const addEntityToggleRef = useRef(null);
    const containerRef = useRef<HTMLDivElement | null>(null)
    const buttonsContainerRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        const addEntityToggle = addEntityToggleRef.current;
        if (!addEntityToggle)
            return
        const tl = gsap.timeline();
        if (showAddEntityToggle && actionToogleOpen) {
            tl
                .to(addEntityToggle, {
                    display: 'block'
                })
                .to(addEntityToggle, {
                    y: -150,
                    duration: 1,
                    ease: 'power1.in'
                })
        } else {
            tl
                .to(addEntityToggle, {
                    y: -800,
                    duration: 1,
                    ease: 'power1.in'
                })
                .to(addEntityToggle, {
                    display: 'none'
                })
        }
    }, [showAddEntityToggle, actionToogleOpen]);

    const toggleAddEntity = () => {
        toggleActions();
        setShowAddEntityToggle(true);
    }
    return (
        <PermissionsGuard
            permissions={[]}
            roles={['admin']}
        >
            <div className={styles.container} ref={containerRef}>
                <div className={styles.addEntityToogle} ref={addEntityToggleRef}>
                    <AddEntity />
                </div>
                <div className={styles.pathAndButtonsContainer}>
                    <div className={styles.pathAndIcon}>
                        <div className={styles.iconPath}>
                            <StudentIcon />
                        </div>
                        <div className={styles.path}>
                            {path}
                        </div>
                    </div>

                    <div className={styles.topButtons} ref={buttonsContainerRef}>
                        <AddButton
                        title={'Add role'}
                            permissions={["students.create"]}
                            roles={["admin"]}
                            icon={PlusCircle}
                            toggleAddEntity={toggleAddEntity}
                        />
                        <MoreButtons
                            permissions={["students.create"]}
                            roles={["admin"]}
                            buttonsList={[
                                {
                                    title: 'import file',
                                    icon: ExamIcon,
                                },
                                {
                                    title: 'export',
                                    icon: ExamIcon,
                                },
                                {
                                    title: 'delete',
                                    icon: ExamIcon,
                                }
                            ]}
                        />
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <TableDisplay tableTitle={[
                        { title: "Id", key: "id" },
                        { title: "Role", key: "role" },
                        { title: "Description", key: "description" }
                    ]}
                        dataUrl='/authorisation/get-all-roles'
                        filterOptions={[
                            {
                                value: "role",
                                text: "Role"
                            },
                        ]}
                        sortOptions={[
                            {
                                value: "role",
                                text: "Role"
                            },
                        ]}
                    />
                </div>

            </div>
        </PermissionsGuard>
    );
};

export default Roles;