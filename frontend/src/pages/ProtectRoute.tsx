
import { Navigate} from "react-router-dom";
import { FC, ReactNode } from "react";
import { User } from "../models/types";

interface ProtectedRouteProps {
    children: ReactNode;
    user: User | undefined
}

export const ProtectRoutes: FC<ProtectedRouteProps> = ({ children, user }) => {
    if (!user) {
        return <Navigate to="/login" />;
    }
    return <div>{children}</div>;
}
 


