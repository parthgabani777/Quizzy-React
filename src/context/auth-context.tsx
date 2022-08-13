import { getAuth, User } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { login, signup, signout } from "../services/auth-services";
import { toast } from "react-toastify";
import { LoginCredentialsType, SignupCredentialsType } from "types/auth.types";
import { authContextType } from "../types/auth.context.types";

const initialValue = null;

const authContext = createContext<authContextType | null>(initialValue);

type LocationState = {
    from: {
        pathname: string;
    };
};

const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(initialValue);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate();
    const location = useLocation();
    const locationState = (location.state as LocationState) || "/";
    const { from } = locationState;

    useEffect(() => {
        const auth = getAuth();
        const unsubsrcibe = auth.onAuthStateChanged((user: User | null) => {
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

    const value: authContextType = {
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
