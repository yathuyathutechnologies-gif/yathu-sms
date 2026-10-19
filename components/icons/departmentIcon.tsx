


const DepartmentIcon = ({
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
            <path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M12 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm0 0v4m-6 4a2 2 0 1 0 0 4a2 2 0 0 0 0-4Zm0 0v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m0 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4Z" />
        </svg>
    );
};

export default DepartmentIcon;