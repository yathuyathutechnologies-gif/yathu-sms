"use client";
import { BellDot, User2Icon } from 'lucide-react';
import styles from './styles/staffTopAppBar.module.css';
import MenuIcon from '@/components/icons/MenuIcon';
import { useState } from 'react';
import { useStaffPortal } from '@/app/staffPortal/StaffPortalContext';
import { truncate } from '../functions/truncate';
import Skeleton from './skeleton';
const StaffTopAppBar = () => {

    const {
        toggleMobileSidebar,
        user,
        isAuthLoading,
        title,
        toggleActions
    } = useStaffPortal();

    return (
        <div className={styles.container}>
            {/* menu, profile, notification */}
            <ul className={styles.actionButtonsList}>

                <li>{isAuthLoading ?
                    (<Skeleton
                        width={25}
                        height={25}
                        radius={25} />
                    ) : (
                        <BellDot size={20} />
                    )}
                </li>
                <li style={{ border: isAuthLoading?'none': '1px solid #ccc' }}>
                    {isAuthLoading ?
                        (<Skeleton
                            width={25}
                            height={25}
                            radius={25} />
                        ) : (
                            <User2Icon size={20} />
                        )}
                </li>
                <li onClick={()=>{
                    toggleMobileSidebar()
                    }}>
                    {isAuthLoading ?
                        (<Skeleton
                            width={30}
                            height={25}
                            radius={10} />
                        ) : (

                            <MenuIcon />
                        )}
                </li>
                <li>

                    {isAuthLoading ?
                        (<Skeleton
                            width={100}
                            height={15}
                            radius={10} />
                        ) : (

                            <div>
                                {
                                    title
                                }
                            </div>
                        )}

                    {isAuthLoading ?
                        (<Skeleton
                            width={50}
                            height={15}
                            radius={10} />
                        ) : (
                            <div>

                                {truncate(
                                    user ? user?.firstName : "",
                                    10)}

                                {truncate(
                                    user ? user?.lastName : "",
                                    10)}
                            </div>
                        )}

                </li>
            </ul>
        </div>
    );
}
export default StaffTopAppBar;