"use client";

import { usePathname } from "next/navigation";
import styles from "./styles/students.module.css";
import { useState } from "react";
import TableDisplay from "@/components/ui/tableDisplay";
import StudentIcon from "@/components/icons/StudentIcon";


const Student = () => {
    const path = usePathname();

    return (
        <div className={styles.container}>

           <div className={styles.pathAndIcon}>
            <div className={styles.iconPath}>
                <StudentIcon/>
            </div>
             <div className={styles.path}>
                {path}
            </div>
           </div>

            <div className={styles.tableContainer}>
                <TableDisplay />
            </div>

        </div>
    );
};

export default Student;