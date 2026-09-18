import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hook";

const protectedRoute = ()=>{

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const accessToken = useAppSelector((state) => state.auth.accessToken);

    if (!isAuthenticated || !accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet/>
}

export default protectedRoute;