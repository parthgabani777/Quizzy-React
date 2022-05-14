import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { useLoader } from "../../context/loader-context";
import { useAuth } from "../../context/auth-context";

function Signup() {
    const { loading, setLoading } = useLoader();

    const { signupHandler } = useAuth();

    const defaultSignupCredentials = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const [signupCredentials, setSignupCredentials] = useState(
        defaultSignupCredentials
    );

    const [showPassword, setShowPassword] = useState(false);

    const signupCredentialsChangeHandler = (e) => {
        setSignupCredentials({
            ...signupCredentials,
            [e.target.id]: e.target.value,
        });
    };

    const signupClickHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        signupCredentials.password === signupCredentials.confirmPassword &&
            (await signupHandler(signupCredentials));
        setLoading(false);
    };

    return (
        <section className="signup bg-primary">
            {loading || (
                <form className="auth text-s">
                    <div className="auth-form box-shadow p-4">
                        <h3 className="text-l text-center py-1">Signup</h3>

                        <div className="input-group py-1">
                            <label htmlFor="firstname">Firstname</label>
                            <input
                                type="text"
                                className="input text-s"
                                placeholder="firstname"
                                id="firstname"
                                value={signupCredentials.firstname}
                                onChange={signupCredentialsChangeHandler}
                            />
                        </div>

                        <div className="input-group py-1">
                            <label htmlFor="lastname">Lastname</label>
                            <input
                                type="text"
                                className="input text-s"
                                id="lastname"
                                placeholder="lastname"
                                value={signupCredentials.lastname}
                                onChange={signupCredentialsChangeHandler}
                            />
                        </div>

                        <div className="input-group py-1">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="text"
                                className="input text-s"
                                id="email"
                                placeholder="mail@gmail.com"
                                value={signupCredentials.email}
                                onChange={signupCredentialsChangeHandler}
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
                                    value={signupCredentials.password}
                                    onChange={signupCredentialsChangeHandler}
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

                        <div className="input-group py-1">
                            <label htmlFor="confirm-password">
                                Confitm Password
                            </label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input text-s"
                                    id="confirm-password"
                                    placeholder="************"
                                    value={signupCredentials.confirmPassword}
                                    onChange={(e) => {
                                        setSignupCredentials({
                                            ...signupCredentials,
                                            confirmPassword: e.target.value,
                                        });
                                    }}
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
                                <input type="checkbox" id="tc" />
                                <label htmlFor="tc">
                                    I accept all terms and conditions
                                </label>
                            </div>
                        </div>

                        <div className="py-1 text-center">
                            <button
                                className="btn btn-light auth-btn br-1"
                                onClick={signupClickHandler}
                            >
                                Create an Account
                            </button>
                        </div>

                        <div className="py-1 text-center">
                            <Link to="/login" className="link-blue">
                                Already have account
                            </Link>
                        </div>
                    </div>
                </form>
            )}
        </section>
    );
}

export { Signup };
