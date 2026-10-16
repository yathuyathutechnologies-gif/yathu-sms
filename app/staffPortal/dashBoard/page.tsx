"use client";

import { ComponentType, useEffect, useState } from "react";
import styles from './styles/dashBoard.module.css';
import DashBoardVisualisationCard from "@/components/ui/dashBoardVisualisationCard";
import StudentIcon from "@/components/icons/StudentIcon";
import AssignmentIcon from "@/components/icons/assignementIcon";
import LectureIcon from "@/components/icons/LectureIcon";
import DashboardTableDisplay from "./dashBoardTable";
import MaleFemaleDonut from "./dashboardGenderDonut";
import GenderDonut from "./dashboardGenderDonut";
import PermissionsGuard from "../permissionsGuad";
import { PreviewCard } from "@base-ui/react";
import { useStaffPortal } from "../StaffPortalContext";
import Skeleton from "@/components/ui/skeleton";

interface VisualCardInterface {
    id: string;
    title: string;
    quantity?: number;
    color: string;
    icon: ComponentType<{ color?: string, size?: number }>;
    permissions: string[];
    roles: string[]
}

const visualCardList: VisualCardInterface[] = [
    {
        id: 'students',
        title: "Students",
        quantity: 0,
        color: "#B3008C",
        icon: StudentIcon,
        permissions: ['student.read'],
        roles: ['lecturer']
    },
    {
        id: 'courses',
        title: "My courses",
        quantity: 0,
        color: "#149a9e",
        icon: StudentIcon,
        permissions: ['courses.read'],
        roles: ['lecturer']
    },
    {
        id: 'assignements',
        title: "Assignment",
        quantity: 0,
        color: "orangered",
        icon: AssignmentIcon,
        permissions: ['assignment.read'],
        roles: ['lecturer']
    },
    {
        id: 'lecturers',
        title: "Lectures",
        quantity: 0,
        color: "#2ED760",
        icon: LectureIcon,
        permissions: ['lecturers.read'],
        roles: ['lecturer']
    },
];
interface VisualSummary {
    title: string;
    id: string;
    quantity: number;
}


const data: VisualSummary[] = [
    {
        id: "students",
        title: "students",
        quantity: 1,
    },
    {
        id: "courses",
        title: "courses",
        quantity: 1,
    },
    {
        id: "assignments",
        title: "assignments",
        quantity: 1,
    },
    // {
    //     id: "lecturers",
    //     title: "lecturers",
    //     quantity: 1,
    // }
];


const StaffDashBorad = () => {
    const [visualBoard, setVisualBoard] = useState<VisualCardInterface[]>(visualCardList);
    const { hasPermission, hasRole, isAuthLoading } = useStaffPortal();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            const updatedBoards = visualCardList.map((item) => {
                const match = data.find((entry) => entry.id === item.id);

                return match
                    ? { ...item, quantity: match.quantity }
                    : item;
            });

            setVisualBoard(updatedBoards);
            setIsLoading(false)
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


    const visibleVisualBoards = visualBoard.filter((item) => {
        if (item.title === "Home") return true;
        const requiredRole = item.roles.some((role) => hasRole(role)) ?? false;
        const requiredPermission = item.permissions.some((permission) => hasPermission(permission)) ?? false
        return requiredRole || requiredPermission;
    });

    const visualBoardsItems = visibleVisualBoards.map((item) => {
        return (
            <li key={item.id}>
                <DashBoardVisualisationCard title={item.title} quantity={item.quantity} color={item.color} icon={item.icon} />
            </li>
        );
    });

    const skeletonVisualBoardItems = Array.from({ length: 4 }, (_, rowIndex) => (
        <li
            key={rowIndex}
            className={styles.navItemContainer}
            aria-hidden="true"
        >
            <Skeleton
                width={200}
                height={120}
                radius={10}
                className={styles.visualCard}
            />
        </li>
    ));
    return (
        <PermissionsGuard
            permissions={["students.read", "students:manage"]}
            roles={['lecturer']}
        >
            <div className={styles.container}>
                {/* visual boards */}
                <ul className={styles.visualCardList}>
                    {isLoading ? (skeletonVisualBoardItems) : (visualBoardsItems)}
                </ul>
                {/* other dashboard information */}
                <div className={styles.dashBoardInformation}>
                    <div>
                        <DashboardTableDisplay tableTitle={[
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
                    {/* male female donut */}
                    <div>
                        <GenderDonut />
                    </div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </PermissionsGuard>
    );
}
export default StaffDashBorad;