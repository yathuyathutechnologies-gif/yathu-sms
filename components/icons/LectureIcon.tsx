import { IconChalkboardTeacher } from "@tabler/icons-react";
import { Home } from "lucide-react";

const LectureIcon = ({
    color = "currentColor",
    size = 24,
}: {
    color?: string;
    size?: number;
}) => {
    return (
        <IconChalkboardTeacher color={color} size={size}/>
    );
}

export default LectureIcon;