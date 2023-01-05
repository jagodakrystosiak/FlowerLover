import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

//czy user ma pozwolenie by tu wejsc

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useContext(AppContext);
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
