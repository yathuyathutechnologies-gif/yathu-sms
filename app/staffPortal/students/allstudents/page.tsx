"use client";

import { usePathname } from "next/navigation";
import styles from "./styles/students.module.css";
import { useLayoutEffect, useRef, useState } from "react";
import TableDisplay from "@/components/ui/tableDisplay";
import StudentIcon from "@/components/icons/StudentIcon";
import { UserPlus2Icon } from "lucide-react";
import PermissionsGuard from "../../permissionsGuad";
import AddButton from "@/components/ui/addButton";
import AddEntity from "@/components/ui/addEntity";
import { useStaffPortal } from "../../StaffPortalContext";
import gsap from "gsap";
import MoreButtons from "@/components/ui/moreButton";
import ExamIcon from "@/components/icons/ExamIcon";

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
                        title={"Create new student"}
                        description={"Register new student into the system"}
                        uploadEntityUrl={"/students/register-student"}
                        buttonText={'Register student'}
                        inputFields={[
                            {
                                fieldName: 'firstName',
                                label: 'First name',
                                inputType: 'text',
                                placeholder: 'Enter first name',
                                required: true,
                            },
                            {
                                fieldName: 'lastName',
                                label: 'Last name',
                                inputType: 'text',
                                placeholder: 'Enter last name',
                                required: true,
                            },
                            {
                                fieldName: 'email',
                                label: 'Email address',
                                inputType: 'email',
                                placeholder: 'Enter email address',
                                required: false,
                            },
                            {
                                fieldName: 'phoneNumber',
                                label: 'Phone number',
                                inputType: 'tel',
                                placeholder: 'Enter phone number',
                                required: true,
                            },
                            {
                                fieldName: 'dateOfBirth',
                                label: 'Date of birth',
                                inputType: 'date',
                                placeholder: '',
                                required: true,
                            }, {
                                fieldName: 'sex',
                                label: 'Sex',
                                inputType: 'dropDown',
                                placeholder: 'Select sex',
                                required: true,
                                options: [
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'female' },
                                ],
                            },
                            {
                                fieldName: 'registrationNumber',
                                label: 'Registration number',
                                inputType: 'text',
                                placeholder: '',
                                required: true,
                            },
                            {
                                fieldName: 'programName',
                                label: 'Program',
                                inputType: 'text',
                                placeholder: '',
                                required: true,
                            },
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
                            title={"Add student"}
                            // path="/staffPortal/students/add"
                            permissions={["students.create"]}
                            roles={["admin"]}
                            icon={UserPlus2Icon}
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
                        { title: "First name", key: "firstName" },
                        { title: "Last Name", key: "lastName" },
                        { title: "Program", key: "program" },
                        { title: "Year", key: "year" },
                        { title: "Sex", key: "sex" }
                    ]}
                        dataUrl='/students/students-information'
                        filterOptions={[
                            {
                                value: "sex",
                                text: "Sex"
                            }, {
                                value: "program",
                                text: "Program"
                            }, {
                                value: "academicYear",
                                text: "Academic year"
                            },
                            {
                                value: "firstName",
                                text: "First name"
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
                            }, {
                                value: "program",
                                text: "Program"
                            }, {
                                value: "academicYear",
                                text: "Academic year"
                            },
                        ]}
                    />
                </div>

            </div>
        </PermissionsGuard>
    );
};

export default AllStudent;