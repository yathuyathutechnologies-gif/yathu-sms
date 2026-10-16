"use client";
import { ComponentType, useLayoutEffect, useRef, useState } from 'react';
import styles from './styles/staffSideMenu.module.css';
import gsap from 'gsap';
import { truncate } from '../functions/truncate';
import { permission, title } from 'process';
import { Home, Icon, Sidebar } from 'lucide-react';
import HomeIcon from '../icons/HomeIcon';
import StudentIcon from '../icons/StudentIcon';
import { useStaffPortal } from '@/app/staffPortal/StaffPortalContext';
import { usePathname, useRouter } from 'next/navigation';
import AssignmentIcon from '../icons/assignementIcon';
import ClassIcon from '../icons/classIcon';
import LectureIcon from '../icons/LectureIcon';
import ExamIcon from '../icons/ExamIcon';
import Skeleton from './skeleton';
interface navItem {
    title: string;
    icon: ComponentType<{ color?: string, size?: number }>;
    navLink?: string;
    iconColor: string;
    permissions: string[];
    roles: string[];
    subNavItems?: navItem[];
}
const navItems: navItem[] = [
    {
        title: 'DashBoard',
        icon: HomeIcon,
        navLink: 'staffPortal/dashBoard',
        iconColor: 'black',
        permissions: [],
        roles: ['admin', 'lecturer']
    },
    {
        title: 'Students',
        icon: StudentIcon,
        // navLink: 'staffPortal/students',
        iconColor: 'black',
        permissions: ['students.read'],
        roles: ['lecturer', 'admin'],
        subNavItems: [
            {
                title: 'My students',
                icon: StudentIcon,
                navLink: 'staffPortal/students/mystudents',
                iconColor: 'black',
                permissions: [],
                roles: ['lecturer']
            }, {
                title: 'All students',
                icon: StudentIcon,
                navLink: 'staffPortal/students/allstudents',
                iconColor: 'black',
                permissions: [],
                roles: ['admin']
            },
        ]
    },
    {
        title: 'Lectures',
        icon: LectureIcon,
        navLink: 'staffPortal/lecturers',
        iconColor: 'black',
        permissions: ['lecturers.read'],
        roles: ['lecturer']
    },
    {
        title: 'Class',
        icon: ClassIcon,
        navLink: 'staffPortal/classes',
        iconColor: 'black',
        permissions: ['timetable.read'],
        roles: ['lecturer']
    },
    {
        title: 'Assignment',
        icon: AssignmentIcon,
        // navLink: 'staffPortal/students',
        iconColor: 'black',
        permissions: [],
        roles: ['lecturer']
    }, {
        title: 'Exam',
        icon: ExamIcon,
        // navLink: 'staffPortal/students',
        iconColor: 'black',
        permissions: [],
        roles: ['lecturer']
    }
];

// to do: make filter the sub nav items. on permissions and roles
const StaffSideBarMenu = () => {
    const route = useRouter();
    // use ref
    const sideBarMenuRef = useRef(null);
    const brandRef = useRef(null);
    const toggleRef = useRef(null);
    const navTitleRef = useRef<(HTMLDivElement | null)[]>([]);
    const navIconRef = useRef<(HTMLDivElement | null)[]>([]);
    const solidNavLeftBarRef = useRef<HTMLDivElement | null>(null);
    const navItemRef = useRef<(HTMLLIElement | null)[]>([]);
    const previousActiveIndexRef = useRef<number>(-1);
    const [expadedNavItemIds, setExpandedNavItemIds] = useState<string[]>([])
    const pathname = usePathname();

    const handleNavItemExpand = (
        isExpanded: boolean,
        id: string
    ) => {
        setExpandedNavItemIds((previous) => {
            return isExpanded
                ? previous.filter((expandedId) => expandedId !== id)
                : [...previous, id];
        });
    };
    const {
        sidebarExpanded,
        toggleSidebar,
        mobileSidebarOpen,
        toggleMobileSidebar,
        hasPermission,
        hasRole,
        isAuthLoading
    } = useStaffPortal();

    useLayoutEffect(() => {

        console.log(isAuthLoading, mobileSidebarOpen)
        const brand = brandRef.current;
        const toggle = toggleRef.current;
        const sideBarMenu = sideBarMenuRef.current
        const mm = gsap.matchMedia();
        if (isAuthLoading) {
            return
        }
        if (!brand || !toggle || !sideBarMenu) {
            return
        }
        mm.add("(min-width: 769px)", () => {
            const tl = gsap.timeline({})
            if (!sidebarExpanded) {
                tl.to(brand, {
                    x: '-100px',
                    ease: 'power1.in'
                })
                    .to(toggle, {
                        x: '-18px',
                        ease: 'power1.in'
                    }, '<')
                    .to(brand, {
                        opacity: 0,
                        ease: 'power1.in'
                    }, '<')

                    .to(sideBarMenu, {
                        width: '60px',
                        ease: 'power1.in'
                    }, '<')
            }
            else {
                tl
                    .to(sideBarMenu, {
                        width: '20vw',
                        ease: 'power1.in'
                    })
                    .to(toggle, {
                        x: 0,
                        ease: 'power1.in'
                    }, '<')
                    .to(brand, {
                        x: 0,
                        ease: 'power1.in'
                    }, '<')
                    .to(brand, {
                        opacity: 1,
                        ease: 'power1.in'
                    }, '<')
            }
            expandSideBarNavItems(sidebarExpanded);
        });

        mm.add("(max-width: 768px)", () => {
            // close toogle
            const tl = gsap.timeline({})
            // we are reversing the boolean because it works inversely for desktop and mobile
            if (!mobileSidebarOpen) {
                tl.to(sideBarMenuRef.current, {
                    x: -300,
                    ease: 'power1.in',
                    duration: 1.2
                })
            }
            else {
                tl.to(sideBarMenuRef.current, {
                    x: 0,
                    ease: 'power1.in',
                    duration: 1.2
                })
            }
        });
        // return () => mm.revert();
    }, [sidebarExpanded, mobileSidebarOpen]);


    const expandSideBarNavItems = (isExpanded: boolean) => {
        const tl = gsap.timeline({});
        const navTitle = navItemRef.current;
        const navIcon = navIconRef.current;

        if (!navIcon || !navTitle) {
            return
        }
        if (!isExpanded) {
            tl
                .to(navTitle, {
                    x: '-200px',
                    ease: 'power1.in'
                })
                .to(navIcon, {
                    // x: '-10px',
                    width: '90px',
                    padding: '0px',
                    gap: '0px',
                    ease: 'power1.in'
                })
                .to(navTitle, {
                    opacity: 0,
                    ease: 'power1.in'
                }, '<')
        }
        else {
            tl
                .to(navTitle, {
                    opacity: 1,
                    ease: 'power1.in'
                }, '<')
                .to(navIcon, {
                    x: 0,
                    ease: 'power1.in'
                }, '<')
                .to(navTitle, {
                    x: 0,
                    ease: 'power1.in'
                })

        }
    }
    const handleNavItemClick = (link: string) => {
        if (link === '') {
            return
        }
        route.push(`/${link}`);
        const mm = gsap.matchMedia();

        mm.add("(max-width: 768px)", () => {
            toggleMobileSidebar();
        });
    }
    const visibleNavItems = navItems.filter((item) => {
        const requiredRole = item.roles.some((role) => hasRole(role));
        const requiredPermission = item.permissions.some((permission) => hasPermission(permission))
        // console.log(requiredRole || requiredPermission)
        return requiredRole || requiredPermission;
    });


    const navList = visibleNavItems.map((item, index) => {
        const isExpanded = expadedNavItemIds.includes(item.title);
        const visibleSubNavItems = item.subNavItems?.filter((item) => {
            const requiredRole = item.roles.some((role) => hasRole(role));
            const requiredPermission = item.permissions.some((permission) => hasPermission(permission))
            // console.log(requiredRole || requiredPermission)
            return requiredRole || requiredPermission;
        });
        // sub items
        const subNavList = visibleSubNavItems?.map((subItem, subIndex) => {
            const isSubNavActive =
                pathname === `/${subItem.navLink}`;
            const Icon = subItem.icon
            return (
                <li className={`${styles.subNavItemContainer} ${isSubNavActive ? styles.activeSubNavItem : ""
                    }`}
                    key={subIndex}
                    onClick={() => {
                        if (subItem.navLink == "" || !subItem.navLink) {
                            // expand sub navs
                            return
                        }
                        handleNavItemClick(subItem.navLink);
                    }}
                >
                    <div className={styles.subNavTitle}
                    // ref={(element) => {
                    //     navTitleRef.current[index] = element;
                    // }}
                    >
                        {truncate(subItem.title, 15)}
                    </div>
                    <div className={styles.subNavIcon}
                    //  ref={(element) => {
                    //     navIconRef.current[index] = element;
                    // }}
                    >
                        <Icon />
                    </div>
                </li>
            );
        });
        const Icon = item.icon
        return (
            <li key={index}
                ref={(element) => {
                    navItemRef.current[index] = element;
                }}>
                <div className={styles.navItemContainer} onClick={() => {
                    if (item.navLink == "" || !item.navLink) {
                        // expand sub navs
                        handleNavItemExpand(isExpanded, item.title);
                        return
                    }
                    handleNavItemClick(item.navLink);
                }}
                >
                    <div className={styles.navTitle} ref={(element) => {
                        navTitleRef.current[index] = element;
                    }}>
                        {truncate(item.title, 10)}
                    </div>
                    <div className={styles.navIcon} ref={(element) => {
                        navIconRef.current[index] = element;
                    }}>
                        <Icon />
                    </div>
                </div>
                <ul className={styles.subNavList}>
                    {subNavList}

                    {/* <div className={styles.subSolidNavLeftBar} ref={solidNavLeftBarRef} /> */}
                </ul>
            </li>
        );
    });

    useLayoutEffect(() => {
        const activeIndex = visibleNavItems.findIndex(
            (item) => `/${item.navLink}` === pathname
        );

        const activeSubNavIndex = visibleNavItems.findIndex(
            (item) =>
                item.subNavItems?.some(
                    (subItem) => `/${subItem.navLink}` === pathname
                ) ?? false
        );

        // Use the parent index when a sub-navigation item is active.
        const currentActiveIndex =
            activeIndex !== -1 ? activeIndex : activeSubNavIndex;

        if (currentActiveIndex === -1) {
            return;
        }

        const activeItem = navItemRef.current[currentActiveIndex];

        if (!activeItem || !solidNavLeftBarRef.current) {
            return;
        }

        const activeTitle = activeItem.children[0];
        const activeIcon = activeItem.querySelector(
            `.${styles.navIcon}`
        );

        if (!activeIcon) {
            return;
        }

        const previousIndex = previousActiveIndexRef.current;
        const previousItem =
            previousIndex !== -1
                ? navItemRef.current[previousIndex]
                : null;

        const tl = gsap.timeline();

        if (previousItem && previousItem !== activeItem) {
            const previousTitle = previousItem.children[0];
            const previousIcon = previousItem.querySelector(
                `.${styles.navIcon}`
            );

            tl.to(previousItem, {
                x: 0,
                duration: 0.2,
            });

            tl.to(
                previousTitle,
                {
                    color: "black",
                    duration: 0.2,
                },
                "<"
            );

            if (previousIcon) {
                tl.to(
                    previousIcon,
                    {
                        color: "black",
                        duration: 0.2,
                    },
                    "<"
                );
            }
        }

        tl.to(
            solidNavLeftBarRef.current,
            {
                y:
                    activeItem.offsetTop -
                    solidNavLeftBarRef.current.offsetTop,
                duration: 0.3,
                ease: "power2.out",
            },
            previousItem ? ">" : "<"
        );

        tl.to(
            activeItem,
            {
                x: 4,
                duration: 0.2,
            },
            "<"
        );

        tl.to(
            activeTitle,
            {
                color: "var(--accent-color)",
                duration: 0.5,
                ease: 'power1.in'
            },
            "<"
        );

        tl.to(
            activeIcon,
            {
                color: "var(--accent-color)",
                duration: 0.2,
                ease: 'power1.in'
            },
            "<"
        );

        previousActiveIndexRef.current = currentActiveIndex;

        return () => {
            tl.kill();
        };
    }, [pathname, visibleNavItems]);


    const skeletonNavItems = Array.from({ length: 6 }, (_, rowIndex) => (
        <div
            key={rowIndex}
            className={styles.navItemContainer}
            aria-hidden="true"
        >
            <div className={styles.navTitle}>
                <Skeleton
                    width={rowIndex === 0 ? "100%" : "80%"}
                    height={24}
                    radius={10}
                />
            </div>
        </div>
    ));
    return (
        <div className={styles.menuSideBar} ref={sideBarMenuRef}>
            {/* brand and expansion toogle */}
            <div className={styles.brandAndExpansionToggle}>
                <div className={styles.brand} ref={brandRef}>
                    {isAuthLoading ?
                        (<Skeleton
                            width={10}
                            height={30}
                            radius={10} />
                        ) : (
                            <span>
                                MC
                            </span>
                        )
                    }
                </div>

                {isAuthLoading ?
                    (<Skeleton
                        width={30}
                        height={30}
                        radius={10} />
                    ) : (
                        <div className={styles.expansionToggle} ref={toggleRef}>
                            <div className={styles.desktopToggle} onClick={() => {
                                toggleSidebar()
                            }}>
                                <Sidebar size={24} />
                            </div>
                            <div className={styles.mobileToggle} onClick={toggleMobileSidebar}>
                                Close
                            </div>
                        </div>
                    )
                }
            </div>

            {/* list nav items container */}
            <ul className={styles.navItemsContainer}>
                {/* {isAuthLoading ?
                    (
                        <Skeleton
                            width={5}
                            height={30}
                            className={styles.solidNavLeftBar}
                        />
                    ) :
                    ( */}
                <div className={styles.solidNavLeftBar} ref={solidNavLeftBarRef} />
                {/* )} */}
                {isAuthLoading ? skeletonNavItems : navList}

            </ul>
        </div>

    );
}
export default StaffSideBarMenu;