import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { AuthContextType } from "types/auth.context.types";
import { useAuth } from "../context/auth-context";

const RequiresAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { currentUser } = useAuth() as AuthContextType;
    const location = useLocation();

    useEffect(() => {
        if (currentUser === null) {
            toast.dismiss();
            toast.error("Login first.");
        }
    }, [currentUser]);

    return currentUser ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequiresAuth;
