import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../../context/auth-context";
import { useLoader } from "../../context/loader-context";
import { LoginCredentialsType } from "types/auth.types";
import { AuthContextType } from "types/auth.context.types";
import { LoaderContextType } from "types/loader.context.types";

function Login() {
    const { loginHandler } = useAuth() as AuthContextType;

    const { loading, setLoading } = useLoader() as LoaderContextType;

    const defaultLoginCredentials = {
        email: "",
        password: "",
    };
    const [loginCredentials, setLoginCredentials] =
        useState<LoginCredentialsType>(defaultLoginCredentials);

    const [showPassword, setShowPassword] = useState(false);

    const loginCredentialsChangeHandler = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.id]: e.target.value,
        });
    };

    const login = async (loginCredentials: LoginCredentialsType) => {
        setLoading(true);
        await loginHandler(loginCredentials);
        setLoading(false);
    };

    const submitLoginCredentials = async (e: FormEvent) => {
        e.preventDefault();
        login(loginCredentials);
    };

    const guestLoginHandler = (e: FormEvent) => {
        e.preventDefault();
        login({
            email: "gabaniparth04@gmail.com",
            password: "parth123",
        });
    };

    return (
        <section className="login bg-primary">
            {loading || (
                <form className="auth text-s" onSubmit={submitLoginCredentials}>
                    <div className="auth-form box-shadow p-4">
                        <h3 className="text-l text-center py-1">Login</h3>

                        <div className="input-group py-1">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="text"
                                className="input text-s"
                                id="email"
                                placeholder="mail@gmail.com"
                                value={loginCredentials.email}
                                onChange={loginCredentialsChangeHandler}
                                required
                            />
                        </div>

                        <div className="input-group py-1">
                            <label htmlFor="password">Password</label>

                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input text-s"
                                    id="password"
                                    placeholder="************"
                                    value={loginCredentials.password}
                                    onChange={loginCredentialsChangeHandler}
                                    required
                                />
                                <i
                                    className={`fas ${
                                        showPassword ? "fa-eye-slash" : "fa-eye"
                                    } `}
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                ></i>
                            </div>
                        </div>

                        <div className="py-1 text-center">
                            <button className="btn btn-light auth-btn br-1">
                                Login
                            </button>
                        </div>

                        <div className="py-1 text-center">
                            <button
                                className="btn btn-light auth-btn br-1"
                                onClick={guestLoginHandler}
                            >
                                Login as guest
                            </button>
                        </div>

                        <div className="py-1 text-center">
                            <Link to="/signup" className="link-blue">
                                Create an Account
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </section>
    );
}

export { Login };
