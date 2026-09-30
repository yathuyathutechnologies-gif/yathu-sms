import { Home, PencilRuler } from "lucide-react";

const ExamIcon = ({
    color = "currentColor",
    size = 24,
}: {
    color?: string;
    size?: number;
}) => {
    return (
        <PencilRuler color={color} size={size}/>
    );
}

export default ExamIcon;