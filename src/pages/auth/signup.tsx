import React, { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";
import { useLoader } from "../../context/loader-context";
import { useAuth } from "../../context/auth-context";
import { toast } from "react-toastify";
import { SignupCredentialsType } from "types/auth.types";
import { AuthContextType } from "types/auth.context.types";
import { LoaderContextType } from "types/loader.context.types";

function Signup() {
    const { loading, setLoading } = useLoader() as LoaderContextType;

    const { signupHandler } = useAuth() as AuthContextType;

    const defaultSignupCredentials: SignupCredentialsType = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const [signupCredentials, setSignupCredentials] =
        useState<SignupCredentialsType>(defaultSignupCredentials);

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const signupCredentialsChangeHandler = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setSignupCredentials({
            ...signupCredentials,
            [e.target.id]: e.target.value,
        });
    };

    const signupSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        signupCredentials.password === signupCredentials.confirmPassword
            ? await signupHandler(signupCredentials)
            : toast.error("Password and Confirm password should be same");
        setLoading(false);
    };

    const guestSignupHandler = (e: FormEvent) => {
        e.preventDefault();
        setSignupCredentials({
            firstName: "john",
            lastName: "doe",
            email: "johndoe@email.com",
            password: "Johndoe@123",
            confirmPassword: "Johndoe@123",
        });
    };

    const passwordValidationMsg = (e: InvalidEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            e.target.setCustomValidity("Enter password");
        } else if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity(
                "Password should have minimum eight characters, at least one uppercase and lowercase letter and one number."
            );
        } else {
            e.target.setCustomValidity("");
        }
        return true;
    };

    return (
        <section className="signup bg-primary">
            {loading || (
                <form className="auth text-s" onSubmit={signupSubmitHandler}>
                    <div className="auth-form box-shadow p-4">
                        <h3 className="text-l text-center py-1">Signup</h3>

                        <div className="input-group py-1">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                className="input text-s"
                                placeholder="John"
                                id="firstName"
                                value={signupCredentials.firstName}
                                onChange={signupCredentialsChangeHandler}
                                required
                            />
                        </div>

                        <div className="input-group py-1">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                type="text"
                                className="input text-s"
                                id="lastName"
                                placeholder="Dave"
                                value={signupCredentials.lastName}
                                onChange={signupCredentialsChangeHandler}
                                required
                            />
                        </div>

                        <div className="input-group py-1">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="text"
                                className="input text-s"
                                id="email"
                                placeholder="john@gmail.com"
                                value={signupCredentials.email}
                                onChange={signupCredentialsChangeHandler}
                                required
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
                                    required
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                    onInvalid={passwordValidationMsg}
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
                                Confirm Password
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
                                Create an Account
                            </button>
                        </div>

                        <div className="py-1 text-center">
                            <button
                                className="btn btn-light auth-btn br-1"
                                onClick={guestSignupHandler}
                            >
                                Fill guest details
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
