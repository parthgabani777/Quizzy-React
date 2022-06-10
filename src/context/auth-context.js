import { getAuth, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { login, signup, signout } from "../services/auth-services";
import { toast } from "react-toastify";

const initialValue = false;

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = getAuth();
    const [currentUser, setCurrentUser] = useState(initialValue);
    const navigation = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const loginHandler = async (loginCredentials) => {
        try {
            const userData = await login(loginCredentials);
            navigation(from);
        } catch (error) {
            toast.error("Check email and password.");
        }
    };

    const signupHandler = async (signupCredentials) => {
        try {
            const userData = await signup(signupCredentials);
            navigation("/");
        } catch (error) {
            toast.error("Can not signup");
        }
    };

    const signoutHandler = async () => {
        try {
            signout();
        } catch (error) {
            toast.error("Can not signout");
        }
    };

    const value = {
        currentUser,
        setCurrentUser,
        loginHandler,
        signupHandler,
        signoutHandler,
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
};

const useAuth = () => useContext(authContext);

export { AuthProvider, useAuth };
