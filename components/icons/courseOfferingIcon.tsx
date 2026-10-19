import { GraduationCap, User } from "lucide-react";

const CourseOfferingIcon = ({
    color = "currentColor",
    size = 24,
    ...props
}: {
    color?: string;
    size?: number;
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={(size * 16) / 9}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
            color={color}
        >
      
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <g mask="url(#SVGsZ1vtcCp)">
                    <path d="M4.75 18.75V5.25a2.5 2.5 0 0 1 2.5-2.5h10a2 2 0 0 1 2 2v11.5H6.75a2 2 0 0 0-2 2Zm0 0a2.5 2.5 0 0 0 2.5 2.5h12v-4.5m-10-9.5h5.5" />
                </g>
                <circle cx="17.5" cy="17.5" r="3.5" />
                <path d="M17.5 15.75v1.75l1.25 1" />
            </g>
        </svg>
    );
};

export default CourseOfferingIcon;