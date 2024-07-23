import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PropertyPage from "./components/PropertyPage";
import AuthRoute from "./components/AuthRoute";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route
                        path="/home"
                        element={<AuthRoute children={<PropertyPage />} />}
                    />
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
