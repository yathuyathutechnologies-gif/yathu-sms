"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import style from "./styles/Menu.module.css";
import { useRouter } from "next/navigation";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Menu({ MenuClosingRef, orangeTechRef }) {
    const topNavBarRef = MenuClosingRef;

    const menuRef = useRef(null);
    const menuItemsRef = useRef(null);
    const menuContainerRef = useRef(null);

    const whiteTextRef = useRef(null);

    const localOrangeTechRef = useRef(null);
    const collegeRef = orangeTechRef || localOrangeTechRef;
    const closeMenuRef = useRef(null);

    const router = useRouter();
    const menuItems = [
        { id: 1, label: "Home" },
        { id: 2, label: "About" },
        { id: 4, label: "Administration" },
        { id: 5, label: "Staff" },
        { id: 6, label: "Students" },
        { id: 7, label: "Apply" },
    ];

    useLayoutEffect(() => {
        if (!topNavBarRef?.current) return;

        const ctx = gsap.context(() => {
            const items = menuItemsRef.current?.children || [];

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 0,
                    end: "+=100",
                    scrub: true
                }
            });

            tl.to([menuRef.current, items], {
                color: "#666",
                ease: "none"
            })
                .to(topNavBarRef.current, {
                    backgroundColor: "#ffffff",
                    ease: "none"
                })
                .to(menuRef.current, {
                    opacity: 1,
                    x: 0,
                    duration: 1
                });

            tl.to(menuItemsRef.current, {
                x: 20,
                opacity: 0,
                ease: "power2.out"
            }, "+=1");

            const refresh = () => ScrollTrigger.refresh();
            window.addEventListener("resize", refresh);

            return () => window.removeEventListener("resize", refresh);
        });

        return () => ctx.revert();
    }, [topNavBarRef]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const white = whiteTextRef.current;
            const college = collegeRef.current;

            if (!white || !college) return;

            gsap.set(white, { text: "Malawi", color: "#666" });
            gsap.set(college, { text: "College", color: "orangered" });

            gsap.to(white, {
                text: "M",
                color: "#666",
                duration: 0.6,
                delay: 1,
                ease: "power2.out"
            });
               gsap.to(college, {
                text: "C",
                duration: 0.4,
                delay: 1.5,
                ease: "power1.out"
            });
        });

        return () => ctx.revert();
    }, [collegeRef]);

    useLayoutEffect(() => {
        const menu = menuRef.current;
        const items = menuItemsRef.current;
        const container = menuContainerRef.current;

        if (!menu || !items || !container) return;

        gsap.set(items, { x: 0, opacity: 1 });

        const tl = gsap.timeline({ paused: true });

        tl.to(items, {
            x: -50,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out"
        });

        const onEnter = () => tl.play();
        const onLeave = () => tl.reverse();

        menu.addEventListener("mouseenter", onEnter);
        container.addEventListener("mouseleave", onLeave);

        return () => {
            menu.removeEventListener("mouseenter", onEnter);
            container.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(max-width: 768px)", () => {
            const menu = menuRef.current;
            const items = menuItemsRef.current;
            const closeMenu = closeMenuRef.current;
            if (!menu || !items) return;
            gsap.set(items, { y: "-100%" });
            gsap.set(items.children, {

                color: "#303030",
                y: 50, opacity: 0
            });

            let isOpen = false;

            const tl = gsap.timeline({ paused: true });

            tl.to(items, {
                y: 0,
                duration: 0.5,
                ease: "power3.out"
            })
                .to(items.children, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.4
                }, "-=0.2")
                .to(closeMenu, {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                })

            const handleClick = () => {
                if (!isOpen) {
                    tl.play();
                } else {
                    tl.reverse();
                }
                isOpen = !isOpen;
            };

            menu.addEventListener("click", handleClick);
            closeMenu.addEventListener("click", handleClick)

            return () => {
                closeMenu.removeEventListener("click", handleClick);
                menu.removeEventListener("click", handleClick);
            };
        });

        return () => mm.revert();
    }, []);

    const handleMenuItemClick = (itemLabel) => {
        console.log(itemLabel);
        const path = itemLabel.toLowerCase()
        console.log(path)
        router.push(`/${path}`)
    }

    return (
        <div className={style.topNavBar} ref={topNavBarRef}>

            <div className={style.brand}>
                <span ref={whiteTextRef} />
                <span ref={collegeRef} />
            </div>

            <div className={style.menuContainer} ref={menuContainerRef}>
                <div className={`${style.menu} menu`} ref={menuRef}>
                    Menu
                </div>

                <ul className={style.menuItems} ref={menuItemsRef}>
                    <div className={style.closeMenu} ref={closeMenuRef}>
                        close
                    </div>
                    {menuItems.map((item) => (
                        <li key={item.id} onClick={() => handleMenuItemClick(item.label)} className={style.menuItem}>
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}