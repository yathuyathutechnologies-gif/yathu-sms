import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerProps = React.ComponentProps<typeof LoaderCircle> & {
    label?: string;
    size?: number;
};

export const Spinner = React.forwardRef<
    SVGSVGElement,
    SpinnerProps
>(
    (
        {
            className,
            label = "Loading",
            size = 24,
            ...props
        },
        ref
    ) => (
        <LoaderCircle
            ref={ref}
            data-slot="spinner"
            className={cn("spinner", className)}
            role="status"
            aria-label={label}
            size={size}
            {...props}
        />
    )
);

Spinner.displayName = "Spinner";