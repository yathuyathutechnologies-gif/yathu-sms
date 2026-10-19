"use client";
import { ComponentType, useLayoutEffect, useRef, useState } from 'react';
import styles from './styles/staffSideMenu.module.css';
import gsap from 'gsap';
import { truncate } from '../functions/truncate';
import { permission, title } from 'process';
import { Home, Icon, Sidebar, User, X } from 'lucide-react';
import HomeIcon from '../icons/HomeIcon';
import StudentIcon from '../icons/StudentIcon';
import { useStaffPortal } from '@/app/staffPortal/StaffPortalContext';
import { usePathname, useRouter } from 'next/navigation';
import AssignmentIcon from '../icons/assignementIcon';
import ClassIcon from '../icons/classIcon';
import LectureIcon from '../icons/LectureIcon';
import ExamIcon from '../icons/ExamIcon';
import Skeleton from './skeleton';
import UserIcon from '../icons/User';
import RolesIcon from '../icons/roles';
import PermissionIcon from '../icons/permission';
import UserManagementIcon from '../icons/UserManagement';
import AcademicIcon from '../icons/academicIcon';
import CalenderIcon from '../icons/calenderIcon';
import SemesterIcon from '../icons/semesterIcon';
import DepartmentIcon from '../icons/departmentIcon';
import ProgramIcon from '../icons/programIcon';
import CourseIcon from '../icons/courseIcon';
import CourseOfferingIcon from '../icons/courseOfferingIcon';
import CurriculumIcon from '../icons/curriculumIcon';
import ClassRules from '../icons/classRulesIcon';
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
        iconColor: 'var(--secondary-color)',
        permissions: [],
        roles: ['admin', 'lecturer']
    },
    {
        title: 'Students',
        icon: StudentIcon,
        // navLink: 'staffPortal/students',
        iconColor: 'var(--secondary-color)',
        permissions: ['students.read'],
        roles: ['lecturer', 'admin'],
        subNavItems: [
            {
                title: 'My students',
                icon: StudentIcon,
                navLink: 'staffPortal/students/mystudents',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['lecturer']
            }, {
                title: 'All students',
                icon: StudentIcon,
                navLink: 'staffPortal/students/allstudents',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            }, {
                title: 'Add students',
                icon: StudentIcon,
                navLink: 'staffPortal/students/addstudents',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            }, {
                title: 'Enrollment',
                icon: StudentIcon,
                // navLink: 'staffPortal/students/addstudents',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },{
                title: 'Admissions',
                icon: StudentIcon,
                // navLink: 'staffPortal/students/addstudents',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
        ]
    },
    {
        title: 'Lectures',
        icon: LectureIcon,
        navLink: 'staffPortal/lecturers',
        iconColor: 'var(--secondary-color)',
        permissions: ['lecturers.read'],
        roles: ['lecturer']
    },
    {
        title: 'Class',
        icon: ClassIcon,
        navLink: 'staffPortal/classes',
        iconColor: 'var(--secondary-color)',
        permissions: ['timetable.read'],
        roles: ['lecturer']
    },
    {
        title: 'Assignment',
        icon: AssignmentIcon,
        // navLink: 'staffPortal/students',
        iconColor: 'var(--secondary-color)',
        permissions: [],
        roles: ['lecturer']
    }, {
        title: 'Exam',
        icon: ExamIcon,
        // navLink: 'staffPortal/students',
        iconColor: 'var(--secondary-color)',
        permissions: [],
        roles: ['lecturer']
    }, {
        title: 'User management',
        icon: UserManagementIcon,
        // navLink: 'staffPortal/students',
        iconColor: 'var(--secondary-color)',
        permissions: [],
        roles: ['admin'],
        subNavItems: [
            {
                title: 'Users',
                icon: UserIcon,
                navLink: 'staffPortal/userManagement/allUsers',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Roles',
                icon: RolesIcon,
                navLink: 'staffPortal/userManagement/roles',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Permission',
                icon: PermissionIcon,
                navLink: 'staffPortal/userManagement/permissions',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Role permission',
                icon: PermissionIcon,
                // navLink: 'staffPortal/userManagement/permissions',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            }
        ]
    }, {
        title: 'Academic',
        icon: AcademicIcon,
        // navLink: 'staffPortal/students',
        iconColor: 'var(--secondary-color)',
        permissions: [],
        roles: ['admin'],
        subNavItems: [
            {
                title: 'Years',
                icon: CalenderIcon,
                // navLink: 'staffPortal/userManagement/allUsers',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Semester',
                icon: SemesterIcon,
                navLink: 'staffPortal/userManagement/roles',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Departments',
                icon: DepartmentIcon,
                // navLink: 'staffPortal/userManagement/permissions',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Programs',
                icon: ProgramIcon,
                // navLink: 'staffPortal/userManagement/permissions',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Courses',
                icon: CourseIcon,
                // navLink: 'staffPortal/userManagement/permissions',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Course offering',
                icon: CourseOfferingIcon,
                // navLink: 'staffPortal/userManagement/permissions',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Curriculum',
                icon: CurriculumIcon,
                // navLink: 'staffPortal/userManagement/permissions',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Programs',
                icon: ProgramIcon,
                // navLink: 'staffPortal/userManagement/permissions',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Class rules',
                icon: ClassRules,
                // navLink: 'staffPortal/userManagement/permissions',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            },
            {
                title: 'Calender',
                icon: CalenderIcon,
                // navLink: 'staffPortal/userManagement/permissions',
                iconColor: 'var(--secondary-color)',
                permissions: [],
                roles: ['admin']
            }
        ]
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

    const subNavTitleRef = useRef<(HTMLDivElement | null)[][]>([]);

    const subNavIconRef = useRef<(HTMLDivElement | null)[][]>([]);

    const subNavItemRef = useRef<(HTMLLIElement | null)[][]>([]);

    const subNavListRef = useRef<(HTMLUListElement | null)[]>([]);

    const solidNavLeftBarRef = useRef<HTMLDivElement | null>(null);

    const navItemRef = useRef<(HTMLLIElement | null)[]>([]);

    const previousActiveIndexRef = useRef<number>(-1);

    const [expandedNavItemIds, setExpandedNavItemIds] = useState<string[]>([])

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

        // console.log(isAuthLoading, mobileSidebarOpen)
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
            expandSideBarNavItems(sidebarExpanded, tl);
        });

        mm.add("(max-width: 768px)", () => {
            // close toogle
            const tl = gsap.timeline({})
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
    }, [sidebarExpanded, mobileSidebarOpen, isAuthLoading]);


    const expandSideBarNavItems = (isExpanded: boolean, tl: gsap.core.Timeline) => {
        // const tl = gsap.timeline({});
        const navTitle = navTitleRef.current;
        const navIcon = navIconRef.current;

        const subNavTitle = subNavTitleRef.current;
        const subNavIcon = subNavIconRef.current;
        const subNavList = subNavListRef.current;
        const subNavItem = subNavItemRef.current;
        if (!navIcon || !navTitle) {
            return
        }
        if (!isExpanded) {
            tl
                .to(subNavList, {
                    padding: '0px 0px 0px 0px',
                    duration: 0.5
                }, '<')
                .to(navTitle, {
                    x: '-200px',
                    ease: 'power1.in',
                }, '<')
                .to(subNavTitle, {
                    x: '-200px',
                    height: '40px',
                    ease: 'power1.in'
                }, '<')
                .to(navIcon, {
                    x: '-10px',
                    width: '90px',
                    ease: 'power1.in'
                }, '<')
                .to(subNavIcon, {
                    x: '-10px',
                    width: '90px',
                    ease: 'power1.in'
                }, '<')
                .to(navTitle, {
                    opacity: 0,
                    ease: 'power1.in'
                }, '<')
                .to(subNavTitle, {
                    opacity: 0,
                    ease: 'power1.in'
                }, '<')
                .to(subNavItem, {
                    borderLeft: 'none'
                }, '<')


        }
        else {
            tl
                .to(navTitle, {
                    opacity: 1,
                    ease: 'power1.in'
                }, '<')
                .to(subNavTitle, {
                    opacity: 1,
                    ease: 'power1.in'
                }, '<')
                .to(navIcon, {
                    x: 0,
                    ease: 'power1.in'
                }, '<')
                .to(subNavIcon, {
                    x: 0,
                    ease: 'power1.in'
                }, '<')
                .to(navTitle, {
                    x: 0,
                    ease: 'power1.in'
                }, '<')
                .to(subNavTitle, {
                    x: 0,
                    ease: 'power1.in'
                }, '<')
                .to(subNavList, {
                    padding: '0px 6px 0px 15px',
                }, '<')

                .to(subNavItem, {
                    borderLeft: '1px solid var(--shade-color)',
                    delay: 0.5
                }, '>')

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

    const previousExpandedIdsRef = useRef<string[]>([]);

    useLayoutEffect(() => {
        const previousExpandedIds = previousExpandedIdsRef.current;

        // Find which navigation item's state changed.
        const changedItemId = [
            ...new Set([
                ...previousExpandedIds,
                ...expandedNavItemIds,
            ]),
        ].find((id) =>
            previousExpandedIds.includes(id) !==
            expandedNavItemIds.includes(id)
        );

        // Update the previous state for the next render.
        previousExpandedIdsRef.current = [...expandedNavItemIds];

        if (!changedItemId) return;

        const index = visibleNavItems.findIndex(
            (item) => item.title === changedItemId
        );

        if (index === -1) return;

        const element = subNavListRef.current[index];

        if (!element) return;

        const isExpanded = expandedNavItemIds.includes(changedItemId);

        gsap.killTweensOf(element);

        if (isExpanded) {
            // Measure the full height without animating other items.
            gsap.set(element, {
                height: "auto",
                overflow: "hidden",
            });

            const fullHeight = element.scrollHeight;

            gsap.fromTo(
                element,
                { height: 0 },
                {
                    height: fullHeight,
                    duration: 0.4,
                    ease: "power1.out",
                    onComplete: () => {
                        gsap.set(element, {
                            height: "auto",
                            overflow: "visible",
                        });
                    },
                }
            );
        } else {
            // Collapse only the targeted navigation item.
            gsap.to(element, {
                height: 0,
                overflow: "hidden",
                duration: 0.4,
                ease: "power1.out",
            });
        }
    }, [expandedNavItemIds, visibleNavItems]);
    const navList = visibleNavItems.map((item, index) => {
        const isExpanded = expandedNavItemIds.includes(item.title);
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
                    ref={(element) => {
                        if (!subNavItemRef.current[index]) {
                            subNavItemRef.current[index] = [];
                        }

                        subNavItemRef.current[index][subIndex] =
                            element;
                    }}
                >
                    <div className={styles.subNavTitle}
                        ref={(element) => {
                            if (!subNavTitleRef.current[index]) {
                                subNavTitleRef.current[index] = [];
                            }

                            subNavTitleRef.current[index][subIndex] =
                                element;
                        }}
                    >
                        {truncate(subItem.title, 15)}
                    </div>
                    <div className={styles.subNavIcon}
                        ref={(element) => {
                            if (!subNavIconRef.current[index]) {
                                subNavIconRef.current[index] = [];
                            }

                            subNavIconRef.current[index][subIndex] =
                                element;
                        }}
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
                        {truncate(item.title, 15)}
                    </div>
                    <div className={styles.navIcon} ref={(element) => {
                        navIconRef.current[index] = element;
                    }}>
                        <Icon />
                    </div>
                </div>
                <ul className={styles.subNavList} ref={(element) => {
                    subNavListRef.current[index] = element;
                }}>
                    {subNavList}


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
        const currentActiveIndex = activeIndex !== -1 ? activeIndex : activeSubNavIndex;

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
                    color: 'var(--secondary-color)',
                    duration: 0.2,
                },
                "<"
            );

            if (previousIcon) {
                tl.to(
                    previousIcon,
                    {
                        color: 'var(--secondary-color)',
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
                            <button className={styles.mobileToggle} onClick={toggleMobileSidebar}>
                                <X />
                            </button>
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