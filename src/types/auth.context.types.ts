import { User } from "firebase/auth";
import { LoginCredentialsType, SignupCredentialsType } from "./auth.types";
import React from "react";

export type AuthContextType = {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
    loginHandler: (loginCredentialsType: LoginCredentialsType) => Promise<void>;
    signupHandler: (signupCredentials: SignupCredentialsType) => Promise<void>;
    signoutHandler: () => Promise<void>;
};
