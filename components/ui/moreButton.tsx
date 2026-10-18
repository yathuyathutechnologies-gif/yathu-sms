import { ChevronDown, ChevronUp, LucideMoreVertical, UserPlus2Icon } from 'lucide-react';
import styles from './styles/moreButton.module.css';
import { ComponentType, useLayoutEffect, useRef, useState } from 'react';
import { useStaffPortal } from '@/app/staffPortal/StaffPortalContext';
import gsap from 'gsap';
import ExamIcon from '../icons/ExamIcon';
interface MoreButtonProp {
    icon?: ComponentType<{ color?: string, size?: number }>;
    permissions?: string[];
    roles?: string[];
    // toggleMoreEntity?: () => void;
    buttonsList: buttonType[]
}
interface buttonType {
    title: string;
    icon?: ComponentType<{ color?: string, size?: number }>;
    handleButtonClick?: () => void
}

const MoreButtons = (
    {
        icon,
        permissions,
        roles,
        buttonsList
    }: MoreButtonProp
) => {
    const { isAuthLoading } = useStaffPortal();
    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const headerIconRef = useRef(null);
    const dropDownListRef = useRef(null);
    const handleMoreClick = () => {
        setShowDropDown(!showDropDown);
    }
    useLayoutEffect(() => {
        const headerIcon = headerIconRef.current;
        const dropDownList = dropDownListRef.current;
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            if (showDropDown) {
                tl.to(headerIcon, {
                    rotate: 180,
                    duration: 0.5,
                    ease: 'power1.in'
                }).to(dropDownList, {
                    display: 'flex'
                },'<').to(dropDownList, {
                    opacity: 1,
                    duration: 0.5
                })
            } else {
                tl.to(headerIcon, {
                    rotate: 0,
                    duration: 0.5,
                    ease: 'power1.in'
                }).to(dropDownList, {
                    opacity: 0,
                    duration: 0.5
                },'<').to(dropDownList, {
                    display: 'none'
                })
            }
        })
        // return () => ctx.revert()
    }, [showDropDown]);

    const buttonItems = buttonsList.map((item, index) => {
        return (
            <li key={index} className={styles.buttonItem}>
                <button onClick={handleMoreClick}>
                    <span>
                        {item.title}
                    </span>
                    <div className={styles.itemIcon}>
                        <ChevronDown size={18} />
                    </div>
                </button>
            </li>
        );
    });

    return (
        <div className={styles.moreButtonDropContainer}>
            <button className={styles.header} onClick={handleMoreClick}>
                <span>
                    More
                </span>
                <div className={styles.headerIcon} ref={headerIconRef}>
                    <ChevronDown size={18} />
                </div>
            </button>
            <ul className={styles.dropDownList} ref={dropDownListRef}>
                {buttonItems}
            </ul>
        </div>
    );
}

export default MoreButtons;