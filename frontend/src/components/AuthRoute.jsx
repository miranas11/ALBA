import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "./utils/Loading";

const AuthRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
        setIsLoading(false);
    }, [navigate]);

    return isLoading ? <Loading /> : <div>{children}</div>;
};

export default AuthRoute;
