import React from "react";
import { Link } from "react-router-dom";
import { AuthContextType } from "types/auth.context.types";
import { useAuth } from "../context/auth-context";
import "../css/header.css";

function Header() {
    const { currentUser, signoutHandler } = useAuth() as AuthContextType;

    const signout = async () => {
        await signoutHandler();
    };

    return (
        <header>
            <Link to="/" className="main-title">
                <h2>Quizzy</h2>
            </Link>
            {currentUser ? (
                <button className="btn auth-btn text-s" onClick={signout}>
                    Logout
                </button>
            ) : (
                <Link to="/login" className="btn auth-btn text-s">
                    Login
                </Link>
            )}
        </header>
    );
}

export { Header };
