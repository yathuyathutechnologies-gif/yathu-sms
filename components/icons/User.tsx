import { GraduationCap, User, Users2Icon } from "lucide-react";

const UserIcon = ({
    color = "currentColor",
    size = 24,
}: {
    color?: string;
    size?: number;
}) => {
    return <Users2Icon color={color} size={size} />;
};

export default UserIcon;