import { getAuth } from "firebase/auth";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/auth-context";

const RequiresAuth = ({ children }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    return currentUser ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequiresAuth;
