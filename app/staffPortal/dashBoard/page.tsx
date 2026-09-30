"use client";

import { ComponentType, useState } from "react";
import styles from './styles/dashBoard.module.css';
import DashBoardVisualisationCard from "@/components/ui/dashBoardVisualisationCard";
import StudentIcon from "@/components/icons/StudentIcon";
import AssignmentIcon from "@/components/icons/assignementIcon";
import LectureIcon from "@/components/icons/LectureIcon";

interface VisualCardInterface {
    id: string,
    title: string,
    quantity?: number,
    color: string
    icon: ComponentType<{ color?: string, size?: number }>
}
const visualCardList: VisualCardInterface[] = [
    {
        id: '1',
        title: "Students",
        quantity: 120,
        color: "#B3008C",
        icon: StudentIcon,
    },
    {
        id: '2',
        title: "Users",
        quantity: 50,
        color: "#4EE1E6",
        icon: StudentIcon,
    },
    {
        id: '3',
        title: "Assignment",
        quantity: 7,
        color: "orangered",
        icon: AssignmentIcon,
    },
    {
        id: '4',
        title: "Lectures",
        quantity: 78,
        color: "#2ED760",
        icon: LectureIcon,
    },
]
const StaffDashBorad = () => {
    const [visualBoard, setVisualBoard] = useState<VisualCardInterface[]>(visualCardList)
    const visualBoardsItems = visualBoard.map((item) => {
        return (
            <li key={item.id}>
                <DashBoardVisualisationCard title={item.title} quantity={item.quantity} color={item.color} icon={item.icon} />
            </li>
        );
    });
    return (
        <div className={styles.container}>
            {/* visual boards */}
            <ul className={styles.visualCardList}>
            {visualBoardsItems}
            </ul>
        </div>
    );
}
export default StaffDashBorad;