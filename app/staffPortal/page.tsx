"use client";
import { memo, useEffect, useState } from 'react';
import styles from './styles/login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { EyeClosed, EyeIcon } from 'lucide-react';
import { setErrorMap } from 'zod';
import { useStaffPortal } from './StaffPortalContext';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { truncate } from '@/components/functions/truncate';

const StaffLoginPage = () => {

    const { setAccessToken, setRoles, setPermissions, setUser, setTitle } = useStaffPortal();
    const [showPassword, setShowPassword] = useState(false);
    // const [accessToken, setAccessToken] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setIsLoading] = useState(false);
    // const [showError, setShowError] = useState(true);
    useEffect(() => {
        const checkEmail = () => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
        };

        const checkPassword = () => {
            return (
                password.length >= 8
            );
        };

        const emailValid = checkEmail();
        const passwordValid = checkPassword();

        setCanSubmit(emailValid && passwordValid);
    }, [email, password]);

    const router = useRouter()
    const login = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget)

        const password = formData.get("password");
        const email = formData.get("email");
        try {
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
                const roles: string[] = result.data.roles;
                const permissions: string[] = result.data.permissions;
                const firstName = result.data.firstName;
                const lastName = result.data.lastName;



                if (roles.some((role) => ["lecturer", "admin"].includes(role))) {

                    const title = roles.includes("admin")
                        ? "Administrator"
                        : roles.includes("lecturer")
                            ? "Lecturer"
                            : "Staff";
                    setTitle(title);
                    setRoles(roles);
                    setPermissions(permissions);
                    setUser({ firstName, lastName });
                    router.push("/staffPortal/dashBoard");
                    return;
                }

                else {
                    handleError("You are not authorized to access the lecturer portal.");
                    return;
                }

            } else {
                handleError(result.message || "Login failed.");
                return;
            }
        }
        catch (error) {
            handleError("Unable to connect to the server. Please try again.");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleError = (message: string) => {
        setError(message);
        toast.error(`${truncate(message, 40)}`)
    }
    // effect to show errors.
    return (
        <div className={styles.container}>
            {/* background image */}
            <div className={styles.backgroundContainer}>
                <div className={styles.backgroundImageContainer}>
                    <svg
                        width="0"
                        height="0"
                        style={{ position: "absolute" }}
                    >
                        <defs>
                            <clipPath
                                id="backgroundClip"
                                clipPathUnits="objectBoundingBox"
                            >
                                <path
                                    transform="scale(0.01 0.0142857)"
                                    d="
                                        M 0 0
                                        L 70 0
                                        L 60 100
                                        L 0 100
                                        Z
                                        "
                                />
                            </clipPath>
                        </defs>
                    </svg>
                    <Image
                        src="/images/tool.jpg"
                        alt="Background"
                        width={1200}
                        height={800}
                        priority
                        style={{
                            objectFit: "cover",
                        }}
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
                            <div className={styles.emailContainer}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder=""
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className={styles.passwordContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder=""
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
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
                                disabled={!canSubmit || loading}
                            >
                                {!loading ? (<span>
                                    Sign In
                                </span>) :
                                    (
                                        <Spinner />
                                    )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffLoginPage;