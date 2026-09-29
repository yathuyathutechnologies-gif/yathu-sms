"use client";
import { ComponentType, useLayoutEffect, useRef } from 'react';
import styles from './styles/staffSideMenu.module.css';
import gsap from 'gsap';
import { truncate } from '../functions/truncate';
import { Sidebar } from 'lucide-react';
import HomeIcon from '../icons/HomeIcon';
import StudentIcon from '../icons/StudentIcon';
import { useStaffPortal } from '@/app/staffPortal/StaffPortalContext';
import { usePathname, useRouter } from 'next/navigation';
interface navItem {
    title: string,
    icon: ComponentType<{ color?: string }>,
    navLink: string
}
const navItems: navItem[] = [
    {
        title: 'Home',
        icon: HomeIcon,
        navLink: 'staffPortal/dashBoard'
    },
    {
        title: 'Students',
        icon: StudentIcon,
        navLink: ''
    }
];
const StaffSideBarMenu = () => {
    const route = useRouter();
    // use ref
    const sideBarMenuRef = useRef(null);
    const brandRef = useRef(null);
    const toggleRef = useRef(null);
    const navTitleRef = useRef<(HTMLDivElement | null)[]>([]);
    const navIconRef = useRef<(HTMLDivElement | null)[]>([]);
    const solidNavLeftBarRef = useRef(null);
    const navItemRef = useRef<(HTMLLIElement | null)[]>([]);
    //use states
    // local storage
    const {
        sidebarExpanded,
        toggleSidebar,
        mobileSidebarOpen,
        toggleMobileSidebar
    } = useStaffPortal();

    const expandSideBarNavItems = (isExpanded: boolean) => {
        const tl = gsap.timeline({});
        if (!isExpanded) {
            tl
                .to(navTitleRef.current, {
                    x: '-200px',
                    ease: 'power1.in'
                })
                .to(navIconRef.current, {
                    // x: '-10px',
                    width: '90px',
                    padding: '0px',
                    gap: '0px',
                    ease: 'power1.in'
                })
                .to(navTitleRef.current, {
                    opacity: 0,
                    ease: 'power1.in'
                }, '<')
        }
        else {
            tl
                .to(navTitleRef.current, {
                    opacity: 1,
                    ease: 'power1.in'
                }, '<')
                .to(navIconRef.current, {
                    x: 0,
                    ease: 'power1.in'
                }, '<')
                .to(navTitleRef.current, {
                    x: 0,
                    ease: 'power1.in'
                })

        }
    }

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 769px)", () => {
            const tl = gsap.timeline({})
            if (!sidebarExpanded) {
                tl.to(brandRef.current, {
                    x: '-100px',
                    ease: 'power1.in'
                })
                    .to(toggleRef.current, {
                        x: '-18px',
                        ease: 'power1.in'
                    })
                    .to(brandRef.current, {
                        opacity: 0,
                        ease: 'power1.in'
                    }, '<')

                    .to(sideBarMenuRef.current, {
                        width: '60px',
                        ease: 'power1.in'
                    })
            }
            else {
                tl
                    .to(sideBarMenuRef.current, {
                        width: '20vw',
                        ease: 'power1.in'
                    })
                    .to(toggleRef.current, {
                        x: 0,
                        ease: 'power1.in'
                    })
                    .to(brandRef.current, {
                        x: 0,
                        ease: 'power1.in'
                    })
                    .to(brandRef.current, {
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
                    duration: 0.5
                })
            }
            else {
                tl.to(sideBarMenuRef.current, {
                    x: 0,
                    ease: 'power1.out',
                    duration: 1
                })
            }
        });
        // return () => mm.revert();
    }, [sidebarExpanded, mobileSidebarOpen]);

    const handleNavItemClick = (link: string) => {
        if (link === '') {
            return
        }
        route.push(`/${link}`);
    }
    const navList = navItems.map((item, index) => {
        const Icon = item.icon
        return (
            <li key={index} className={styles.navItemContainer} onClick={() => {
                handleNavItemClick(item.navLink);
            }}
                ref={(element) => {
                    navItemRef.current[index] = element;
                }}>
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
            </li>
        );
    });


    const pathname = usePathname();
    useLayoutEffect(() => {
        const activeIndex = navItems.findIndex(
            (item) => pathname === `/${item.navLink}`
        );

        if (activeIndex === -1) {
            return;
        }

        const activeItem = navItemRef.current[activeIndex];

        if (!activeItem || !solidNavLeftBarRef.current) {
            return;
        }

        gsap.to(solidNavLeftBarRef.current, {
            y: activeItem.offsetTop,
            duration: 0.3,
            ease: "power2.out",
        });
    }, [pathname]);
    return (
        <div className={styles.menuSideBar} ref={sideBarMenuRef}>
            {/* brand and expansion toogle */}
            <div className={styles.brandAndExpansionToggle}>
                <div className={styles.brand} ref={brandRef}>
                    MC
                </div>

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
            </div>

            {/* list nav items container */}
            <div className={styles.navItemsContainer}>
                <div className={styles.solidNavLeftBar} ref={solidNavLeftBarRef} />
                {navList}

            </div>
        </div>

    );
}
export default StaffSideBarMenu;