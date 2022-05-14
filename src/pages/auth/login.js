import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { useAuth } from "../../context/auth-context";
import { useLoader } from "../../context/loader-context";

function Login() {
    const { loginHandler } = useAuth();

    const { loading, setLoading } = useLoader();

    const defaultLoginCredentials = {
        email: "gabaniparth04@gmail.com",
        password: "parth123",
    };
    const [loginCredentials, setLoginCredentials] = useState(
        defaultLoginCredentials
    );

    const [showPassword, setShowPassword] = useState(false);

    const loginCredentialsChangeHandler = (e) => {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.id]: e.target.value,
        });
    };

    const loginClickHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await loginHandler(loginCredentials);
        setLoading(false);
    };

    return (
        <section className="login bg-primary">
            {loading || (
                <form className="auth text-s">
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

                        <div className="input-checkbox py-1">
                            <div>
                                <input type="checkbox" id="remember_me" />
                                <label htmlFor="remember_me">Remember Me</label>
                            </div>
                            <a className="link-blue">Forget Password?</a>
                        </div>

                        <div className="py-1 text-center">
                            <button
                                className="btn btn-light auth-btn br-1"
                                onClick={loginClickHandler}
                            >
                                Login
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
