import { Home } from "lucide-react";

const HomeIcon = ({
    color = "currentColor",
    size = 24,
}: {
    color?: string;
    size?: number;
}) => {
    return (
        <Home color={color} size={size}/>
    );
}

export default HomeIcon;