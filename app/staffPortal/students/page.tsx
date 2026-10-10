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
                    <StudentIcon />
                </div>
                <div className={styles.path}>
                    {path}
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
                            value: "academiYear",
                            text: "Academic year"
                        },
                    ]}
                />
            </div>

        </div>
    );
};

export default Student;