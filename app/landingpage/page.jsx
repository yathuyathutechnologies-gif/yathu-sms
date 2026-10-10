"use client";
import React, { useRef } from "react";
import styles from "./styles/landingpage.module.css";
import Image from "next/image";
import Menu from "../../components/ui/Menu";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  // refs
  const MenuClosingRef = useRef(null);
  const orangeTechRef = useRef(null)
  return (
    <div className={styles.container}>
      <Menu MenuClosingRef={MenuClosingRef} orangeTechRef={orangeTechRef} />
      <section className={styles.heroSection}>

        <div className={styles.deskTopHeroSection}>

          <div className={styles.deskTopHeroSectionText}>
            <div className={`${styles.firstLine} ${styles.header}`}>
              TURN YOUR AMBITION
            </div>
            <div className={`${styles.secondLine} ${styles.header}`}>
              INTO  {" "}<span className={styles.achievement}>ACHIEVEMENT</span>
            </div>
            <div className={styles.heroParagraph}>
              Join a community dedicated to excellence in patient care and professional growth.
            </div>
          </div>

          <div className={styles.heroPhotoContainer}>
            <svg
              width="0"
              height="0"
              style={{ position: "absolute" }}
            >
              <defs>
                <clipPath
                  id="heroClip"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    transform="scale(0.01 0.0142857)"
                    d="
                    M 34 10
                    L 91 10
                    Q 95 10, 95 14

                    L 95 56
                    Q 95 60, 92 60
                    
                    L 72 60
                    Q 70 60, 70 62

                    L 70 61
                    Q 70 63, 68 63

                    L 10 63
                    Q 5 63, 5 59

                    L 5 35
                    Q 5 31, 9 31

                    L 21 31
                    Q 25 31, 25 28

                    L 25 24
                    Q 25 21, 30 21

                    L 32 21
                    Q 34 21, 34 19

                    L 34 14
                    Q 34 10, 38 10
                    Z
                  "
                  />
                </clipPath>
              </defs>
            </svg>
            <div className={styles.heroPath}>
              <Image
                src="/students.jpg"
                alt="Hero"
                fill
                priority
                style={{ objectFit: "cover" }}
                quality={100}
                sizes="60vw"
              />
            </div>

          </div>

        </div>

        <div className={styles.tabletTopHeroSection}>
          <div className={styles.tabletHeroText}>
            <div className={`${styles.firstLine} ${styles.mobileheader}`}>
              TURN YOUR AMBITION
            </div>

            <div className={`${styles.secondLine} ${styles.mobileheader}`}>
              INTO <span className={styles.achievement}>ACHIEVEMENT</span>
            </div>
          </div>
          <div className={styles.tabletHeroPhotoContainer}>
            <svg
              width="0"
              height="0"
              style={{ position: "absolute" }}
            >
              <defs>
                <clipPath
                  id="tabletHeroClip"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    transform="scale(0.01 0.0142857)"
                    d="
                      M 2 10
                      L 96 10
                      Q 98 10, 98 12

                      L 98 68
                      Q 98 70, 96 70

                      L 32 70
                      Q 30 70, 30 68

                      L 30 65
                      Q 30 63, 28 63

                      L 4 63
                      Q 2 63, 2 61

                      L 2 12
                      Q 2 10, 4 10

                      Z
                    "
                  />
                </clipPath>
              </defs>
            </svg>
            <div className={styles.tabletHeroPath}>
              <Image
                src="/students.jpg"
                alt="Hero"
                fill
                priority
                style={{ objectFit: "cover" }}
                quality={100}
                sizes="70vw"
              />
            </div>

          </div>
        </div>

        <div className={styles.mobileTopHeroSection}>
          <div className={styles.mobileHeroText}>
            <div className={`${styles.firstLine} ${styles.mobileheader}`}>
              TURN YOUR AMBITION
            </div>

            <div className={`${styles.secondLine} ${styles.mobileheader}`}>
              INTO <span className={styles.achievement}>ACHIEVEMENT</span>
            </div>
          </div>
          <div className={styles.mobileHeroPhotoContainer}>
            <svg
              width="0"
              height="0"
              style={{ position: "absolute" }}
            >
              <defs>
                <clipPath
                  id="mobileHeroClip"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    transform="scale(0.01 0.0142857)"
                    d="
                      M 10 6
                      L 90 6
                      Q 98 6, 98 9

                      L 98 68
                      Q 98 70, 90 70

                      L 56 70
                      Q 50 70, 50 68

                      L 50 65
                      Q 50 63, 40 63

                      L 10 63
                      Q 2 63, 2 61

                      L 2 9
                      Q 2 6, 10 6

                      Z
                    "
                  />
                </clipPath>
              </defs>
            </svg>
            <div className={styles.mobileHeroPath}>
              <Image
                src="/students.jpg"
                alt="Hero"
                fill
                priority
                style={{ objectFit: "cover" }}
                quality={100}
                sizes="90vw"
              />
            </div>

          </div>

        </div>

        <div className={styles.callToAction}>
          Enroll Today
        </div>

      </section>

      {/* main goal section */}

      <section className={styles.mainGoalSection}>
        <div className={styles.photoSide}>
          <div className={styles.mainGoalPhotoContainer}>
            <svg
              width="0"
              height="0"
              style={{ position: "absolute" }}
            >
              <defs>
                <clipPath
                  id="mainGoalClip"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    transform="scale(0.01 0.0142857)"
                    d="
                      M 2 2
                      L 88 2
                      Q 92 2, 92 6

                      L 92 42
                      Q 92 45, 88 45

                      L 58 45
                      Q 54 45, 55 48

                      L 64 64
                      Q 65 67, 61 67

                      L 6 67
                      Q 2 67, 2 63

                      L 2 6
                      Q 2 2, 6 2

                      Z
                    "
                  />
                </clipPath>

                <clipPath
                  id="goalOrangeClip"
                  clipPathUnits="objectBoundingBox"
                >
                  <path
                    transform="scale(0.01 0.0142857)"
                    d="
                      M 60 47
                      L 90 47
                      Q 92 47, 92 49

                      L 92 65
                      Q 92 67, 90 67

                      L 71 67
                      Q 68 67, 66.5 63

                      L 58 49
                      Q 58 47, 61 47

                      Z
                    "
                  />
                </clipPath>
              </defs>
            </svg>
            <div className={styles.mainGoalPath}>
              <Image
                src="/lecturer theater.jpg"
                alt="Hero"
                fill
                priority
                style={{ objectFit: "cover" }}
                quality={100}
                sizes="190vw"
              />
            </div>

            <div className={styles.textPath}>
              <div className={styles.goalImageText}>
                <span>25 +</span>
                <span>YEARS OF</span>
                <span>EXPERIENCE</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.textSide}>
          <div className={styles.mainGoalHeader}>
            Our Main Goal Is To Train The Best Heath Personnel In Malawi
          </div>
          <div className={styles.mainGoalParagraph}>
            For over 25 years, we have been shaping skilled and compassionate healthcare professionals in Malawi through expert training and hands-on experience.

            For over 25 years, we have been shaping skilled and compassionate healthcare professionals in Malawi through expert training and hands-on experience
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;