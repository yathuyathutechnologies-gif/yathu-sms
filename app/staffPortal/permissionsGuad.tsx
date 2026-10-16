import { ReactNode } from "react";
import { useStaffPortal } from "./StaffPortalContext";
import { Spinner } from "@/components/ui/spinner";

interface PermissionsGuardProps {
    permissions?: string[];
    roles?: string[];
    children: ReactNode
}
const PermissionsGuard = (
    {
        permissions = [],
        roles = [],
        children
    }: PermissionsGuardProps
) => {
    const { isAuthLoading, hasPermission, hasRole } = useStaffPortal();
    if (isAuthLoading) {
        return (<div style={{ width: '100%', height: '200px', display: 'flex', justifyContent: 'center' ,alignItems:'center'}}>
            <Spinner  size={40} label="Loading auth"  />
        </div>)
    }
    const requiredRole = roles.some((role) => hasRole(role)) ?? false;
    const requiredPermission = permissions.some((permission) => hasPermission(permission)) ?? false;
    if (!(requiredRole || requiredPermission)) {
        return <p>You do not have permission to access this page.</p>;
    }

    return <>{children}</>
}
export default PermissionsGuard;