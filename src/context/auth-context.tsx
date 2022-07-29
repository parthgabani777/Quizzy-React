import { getAuth } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { login, signup, signout } from "../services/auth-services";
import { toast } from "react-toastify";
import { LoginCredentialsType, SignupCredentialsType } from "types/auth.types";

const initialValue = false;

const authContext = createContext(initialValue);

const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState(initialValue);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate();
    const location: any = useLocation();
    const from = location.state?.from || "/";

    useEffect(() => {
        const auth = getAuth();
        const unsubsrcibe = auth.onAuthStateChanged((user: any) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubsrcibe;
    }, []);

    const loginHandler = async (loginCredentials: LoginCredentialsType) => {
        try {
            await login(loginCredentials);
            navigation(from);
        } catch (error) {
            toast.error("Check email and password.");
        }
    };

    const signupHandler = async (signupCredentials: SignupCredentialsType) => {
        try {
            await signup(signupCredentials);
            navigation("/");
        } catch (error) {
            console.log(error);
            toast.error("Can not sign up");
        }
    };

    const signoutHandler = async () => {
        try {
            signout();
        } catch (error) {
            toast.error("Can not sign out");
        }
    };

    const value: any = {
        currentUser,
        setCurrentUser,
        loginHandler,
        signupHandler,
        signoutHandler,
    };

    return (
        <authContext.Provider value={value}>
            {!loading && children}
        </authContext.Provider>
    );
};

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };
