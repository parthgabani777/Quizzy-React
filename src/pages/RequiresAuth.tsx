import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth-context";

const RequiresAuth = ({ children }: any) => {
    const { currentUser }: any = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (currentUser === null) {
            toast.dismiss();
            toast.error("Login first.");
        }
    }, []);

    return currentUser ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequiresAuth;
