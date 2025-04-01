import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../Redux/authSlice";
import { FC, ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectRoutes: FC<ProtectedRouteProps> = ({ children }) => {
    const user=useSelector(selectUser)
    if (!user) {
        return <Navigate to="/login" />;
    }
    return <div>{children}</div>;
}

export const ProtectLoginRegister: FC<ProtectedRouteProps> = ({ children }) => {
    const user=useSelector(selectUser)
    if (user) {
        return <Navigate to="/" />;
    }
    return <div>{children}</div>;
}


