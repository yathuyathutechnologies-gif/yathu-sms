import { UserPlus2Icon } from 'lucide-react';
import styles from './styles/addButton.module.css';
import { ComponentType } from 'react';
import { useStaffPortal } from '@/app/staffPortal/StaffPortalContext';
interface AddButtonProp {
    title:string;
    icon: ComponentType<{ color?: string, size?: number }>;
    permissions?: string[];
    roles?: string[];
    toggleAddEntity?: () => void;
}
const AddButton = (
    {
        title,
        icon,
        permissions,
        roles,
        toggleAddEntity
    }: AddButtonProp
) => {
    const { isAuthLoading } = useStaffPortal();
    const handleAddClick = () => {

    }
    const Icon =icon;
    return (
            <button className={styles.addNew} onClick={toggleAddEntity}>
                <span>
                    {title}
                </span>
                <div className={styles.addIcon}>
                    <Icon size={18} />
                </div>
            </button>
    );
}

export default AddButton;