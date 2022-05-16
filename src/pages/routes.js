import { getAuth } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "./index";
import RequiresAuth from "./RequiresAuth";

function PageRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}

export { PageRoutes };
