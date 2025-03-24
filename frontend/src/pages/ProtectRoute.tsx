import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
export const ProtectRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;

}

export const ProtectLoginRegister:React.FC<ProtectedRouteProps>=({children})=>{
    const token = useSelector((state: RootState) => state.auth.token);
    if (token) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
}

