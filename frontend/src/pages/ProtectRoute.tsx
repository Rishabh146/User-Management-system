import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Navigate } from "react-router-dom";
import { selectToken } from "../Redux/authSlice";
import { FC, ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectRoutes: FC<ProtectedRouteProps> = ({ children }) => {
    const token: string | null = useSelector(selectToken);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
}

export const ProtectLoginRegister: FC<ProtectedRouteProps> = ({ children }) => {
    const token: string | null = useSelector(selectToken);
    if (token) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
}


