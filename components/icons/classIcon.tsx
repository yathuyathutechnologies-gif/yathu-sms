import { Home, Users2 } from "lucide-react";

const ClassIcon = ({
    color = "currentColor",
    size = 24,
}: {
    color?: string;
    size?: number;
}) => {
    return (
        <Users2 color={color} size={size}/>
    );
}

export default ClassIcon;