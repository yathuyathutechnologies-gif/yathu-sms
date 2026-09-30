"use client";
import { LecternIcon } from 'lucide-react';
import styles from './styles/clalsses.module.css';
import { usePathname } from 'next/navigation';
import ClassIcon from '@/components/icons/classIcon';
import TimeTable from '@/components/ui/timeTable';
const Classes = () => {
    const path = usePathname();
    return (
        <div className={styles.container}>

            <div className={styles.pathAndIcon}>
                <div className={styles.iconPath}>
                    <ClassIcon />
                </div>
                <div className={styles.path}>
                    {path}
                </div>
            </div>

            {/* time table */}
            <div className={styles.timeTableContainer}>
                <TimeTable />
            </div>
        </div>
    );
}
export default Classes;