import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { LoaderProvider } from "./context/loader-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseConfig } from "./firebase/init";
import { initializeApp } from "firebase/app";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

initializeApp(firebaseConfig);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LoaderProvider>
                <AuthProvider>
                    <App />
                    <ToastContainer
                        style={{
                            fontSize: 16,
                        }}
                        position={"bottom-right"}
                        autoClose={2000}
                        theme="dark"
                    />
                </AuthProvider>
            </LoaderProvider>
        </BrowserRouter>
    </React.StrictMode>
);
