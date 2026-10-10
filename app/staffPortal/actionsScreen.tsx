"use client";
import { X } from "lucide-react";
import styles from "./styles/staffportal.module.css";
import { useStaffPortal } from "./StaffPortalContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";
const ActionScreen = () => {
    const { toggleActions, actionToogleOpen } = useStaffPortal();
    const containerRef = useRef(null);
    useEffect(() => {

        const tl = gsap.timeline({})
        if (!actionToogleOpen) {
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 1,
                ease: 'power1.in'
            }).to(containerRef.current, {
                display: "none"
            })
        }

        else {
            tl.to(containerRef.current, {
                display: "block",
                duration:0.5,
            }).to(containerRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power1.out'
            })
        }
    }, [actionToogleOpen])
    return (
        <div className={styles.actionExpanded} ref={containerRef}>
            {/* close actions toogle */}
            <div className={styles.closeActions} onClick={() => { toggleActions() }}>
                <X className={styles.closeIcon} />
            </div>
        </div>
    );
}
export default ActionScreen;