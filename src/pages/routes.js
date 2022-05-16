import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, Rules, Quizzes, Quiz, Result } from "./index";
import RequiresAuth from "./RequiresAuth";

function PageRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
                path="/quizzes/:categoryId"
                element={
                    <RequiresAuth>
                        <Quizzes />
                    </RequiresAuth>
                }
            />
            <Route
                path="/rules/:quizId"
                element={
                    <RequiresAuth>
                        <Rules />
                    </RequiresAuth>
                }
            />
            <Route
                path="/quiz/:quizId"
                element={
                    <RequiresAuth>
                        <Quiz />
                    </RequiresAuth>
                }
            />
            <Route
                path="/result"
                element={
                    <RequiresAuth>
                        <Result />
                    </RequiresAuth>
                }
            />
        </Routes>
    );
}

export { PageRoutes };
