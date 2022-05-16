import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import app from "./firebase/init";
import { LoaderProvider } from "./context/loader-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LoaderProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </LoaderProvider>
        </BrowserRouter>
    </React.StrictMode>
);
