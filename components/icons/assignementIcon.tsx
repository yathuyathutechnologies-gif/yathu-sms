import { ChartBar, Home } from "lucide-react";

const AssignmentIcon = ({
    color = "currentColor",
    size = 24,
}: {
    color?: string;
    size?: number;
}) => {
    return (
        <ChartBar color={color} size={size}/>
    );
}

export default AssignmentIcon;