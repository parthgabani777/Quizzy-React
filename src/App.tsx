import * as React from "react";
import "./App.css";
import "./css/design.css";
import { PageRoutes } from "./pages/routes";
import { Header } from "./components/header";

function App() {
    return (
        <div className="App">
            <Header />
            <PageRoutes />
        </div>
    );
}

export default App;
