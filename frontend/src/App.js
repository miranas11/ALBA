import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PropertyPage from "./components/PropertyPage";
import AuthRoute from "./components/AuthRoute";
import MyContext from "./MyContext";

function App() {
    const [user, setUser] = useState(null);

    const updateUser = (user) => {
        setUser(user);
    };

    return (
        <MyContext.Provider value={{ user, updateUser }}>
            <Router>
                <div>
                    <Routes>
                        <Route
                            path="/home"
                            element={<PropertyPage view={"user"} />}
                        />
                        <Route
                            path="/admin/home"
                            element={
                                <AuthRoute
                                    children={<PropertyPage view={"admin"} />}
                                />
                            }
                        />
                        <Route path="/admin" element={<Home />}></Route>
                    </Routes>
                </div>
            </Router>
        </MyContext.Provider>
    );
}

export default App;
