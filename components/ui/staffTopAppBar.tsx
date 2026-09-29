"use client";
import { BellDot, User2Icon } from 'lucide-react';
import styles from './styles/staffTopAppBar.module.css';
import MenuIcon from '@/components/icons/MenuIcon';
import { useStaffPortal } from '@/app/staffPortal/StaffPortalContext';
const StaffTopAppBar = () => {

    const {
        toggleMobileSidebar,
    } = useStaffPortal();

    return (
        <div className={styles.container}>
            {/* menu, profile, notification */}
            <ul className={styles.actionButtonsList}>
                
                <li>
                    <BellDot size={20} />
                </li>
                <li>
                    <User2Icon size={20} />
                </li>
                <li onClick={toggleMobileSidebar}>
                    <MenuIcon />
                </li>
                <li>
                    <div>
                        Lecture
                    </div>
                    <div>
                        Francis
                    </div>
                </li>
            </ul>
        </div>
    );
}
export default StaffTopAppBar;