"use client";

import { usePathname } from "next/navigation";
import styles from "./styles/subjects.module.css";
import { useLayoutEffect, useRef, useState } from "react";
import TableDisplay from "@/components/ui/tableDisplay";
import StudentIcon from "@/components/icons/StudentIcon";
import PermissionsGuard from "../../permissionsGuad";
import AddEntity from "@/components/ui/addEntity";
import { useStaffPortal } from "../../StaffPortalContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MoreButtons from "@/components/ui/moreButton";
import ExamIcon from "@/components/icons/ExamIcon";
import { PlusCircle } from "lucide-react";
import AddButton from "@/components/ui/addButton";

gsap.registerPlugin(ScrollTrigger);
const AllStudent = () => {
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

                    <AddEntity
                        title={"Create new subject"}
                        description={"Register subject into the system"}
                        uploadEntityUrl={"/authorisation/create-subject"}
                        buttonText={'Create subject'}
                        inputFields={[
                            {
                                fieldName: 'subject',
                                label: 'Subject',
                                inputType: 'text',
                                placeholder: 'Enter subject',
                                required: true,
                            },
                            {
                                fieldName: 'description',
                                label: 'Description',
                                inputType: 'text',
                                placeholder: 'Enter description',
                                required: true,
                            }
                        ]} />
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
                            title={"Add subject"}   
                            permissions={["subject.create"]}
                            roles={["admin"]}
                            icon={PlusCircle}
                            toggleAddEntity={toggleAddEntity}
                        />
                        <MoreButtons
                            permissions={["students.create"]}
                            roles={["admin"]}
                            buttonsList={[
                                // {
                                //     title: 'import file',
                                //     icon: ExamIcon,
                                // },
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
                        { title: "Subject", key: "subject" },
                        { title: "Description", key: "description" },
                   
                    ]}
                        dataUrl='/authorisation/get-all-subjects'
                        filterOptions={[
                            {
                                value: "sex",
                                text: "Sex"
                            },
                            {
                                value: "firstName",
                                text: "First name"
                            },
                            {
                                value: "lastName",
                                text: "Last name"
                            },
                        ]}
                        sortOptions={[
                            {
                                value: "firstName",
                                text: "First name"
                            },
                            {
                                value: "sex",
                                text: "Sex"
                            },
                            {
                                value: "lastName",
                                text: "Last name"
                            },
                        ]}
                    />
                </div>

            </div>
        </PermissionsGuard>
    );
};

export default AllStudent;