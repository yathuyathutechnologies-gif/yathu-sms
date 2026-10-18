import { UserPlus2Icon } from 'lucide-react';
import styles from './styles/addButton.module.css';
import { ComponentType } from 'react';
import { useStaffPortal } from '@/app/staffPortal/StaffPortalContext';
interface AddButtonProp {
    icon: ComponentType<{ color?: string, size?: number }>;
    permissions?: string[];
    roles?: string[];
    toggleAddEntity?: () => void;
}
const AddButton = (
    {
        icon,
        permissions,
        roles,
        toggleAddEntity
    }: AddButtonProp
) => {
    const { isAuthLoading } = useStaffPortal();
    const handleAddClick = () => {

    }
    return (
            <button className={styles.addNew} onClick={toggleAddEntity}>
                <span>
                    Add student
                </span>
                <div className={styles.addIcon}>
                    <UserPlus2Icon size={18} />
                </div>
            </button>
    );
}

export default AddButton;