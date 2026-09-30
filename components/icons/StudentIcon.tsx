import { GraduationCap, User } from "lucide-react";

const StudentIcon = ({
    color = "currentColor",
    size = 24,
}: {
    color?: string;
    size?: number;
}) => {
    return <GraduationCap color={color} size={size} />;
};

export default StudentIcon;