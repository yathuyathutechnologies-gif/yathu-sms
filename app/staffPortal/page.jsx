"use client";
import { useState } from 'react';
import styles from './styles/login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { EyeClosed, EyeIcon } from 'lucide-react';

const StaffLoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [accessToken, setAccessToken] = useState(null);

    const router = useRouter()
    const login = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const formData = new FormData(e.currentTarget)

        const password = formData.get("password");
        const email = formData.get("email");
        const response = await fetch("http://localhost:3001/authentication/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const result = await response.json();
        const responseStatus = response.status;

        if (responseStatus === 201) {
            const accessToken = result.data.accessToken;
            setAccessToken(accessToken);

            router.push("/staffPortal/dashBoard");
        } else {
        }
    };
    return (
        <div className={styles.container}>
            {/* background image */}
            <div className={styles.backgroundContainer}>
                <div className={styles.backgroundImageContainer}>
                    <Image
                        src='/images/tool.jpg'
                        alt='bgImage'
                        quality={70}
                        fill
                        priority
                        className={styles.bgImage}
                    />
                </div>
            </div>
            <div className={styles.loginContainer}>
                {/* login bg image */}
                <div className={styles.loginContainerbackgroundImageContainer}>
                    <svg
                        className={styles.svgMask}
                        viewBox="0 0 1010 600"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <clipPath id="shape">
                                <path
                                    d="
                                    M20 0
                                    H980
                                    Q1000 0 1000 20

                                    L920 560

                                    Q915 600 875 600
                                    H20

                                    Q0 600 0 580
                                    V20

                                    Q0 0 20 0
                                    Z
                                    "
                                />
                            </clipPath>
                        </defs>

                        <image
                            href="/images/tool.jpg"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                            clipPath="url(#shape)"
                        />
                    </svg>
                </div>
                <div className={styles.loginInfo}>
                    {/* brand */}
                    <div className={styles.brand}>
                        {/* <div className={styles.companyName}>
                            YathuYathu
                        </div> */}
                        <div className={styles.systemName}>
                            school management systmem
                        </div>
                    </div>
                    {/* welcome */}
                    <div className={styles.welcome}>
                        <div className={styles.schoolName}>
                            Malawi College
                        </div>
                        <div className={styles.staffPortal}>
                            Staff Portal
                        </div>
                    </div>

                    {/* login form */}
                    <div className={styles.formSection}>

                        <form className={styles.form} onSubmit={login}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder=" "
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className={styles.passwordContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder=" "
                                />

                                <label htmlFor="password">Password</label>

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.showPasswordButton}
                                >
                                    {showPassword ? (
                                        <EyeClosed size={20} />
                                    ) : (
                                        <EyeIcon size={20} />
                                    )}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className={styles.loginButton}
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffLoginPage;