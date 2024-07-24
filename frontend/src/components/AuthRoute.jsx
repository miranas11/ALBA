import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "./utils/Loading";
import authController from "../controller/authController";

const AuthRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/admin");
            return;
        }
        const validate = async () => {
            const response = await authController.validateToken();
            console.log(response);
            if (response.status === 500) {
                navigate("/admin");
            } else {
                setIsLoading(false);
            }
        };

        validate();
    }, [navigate]);

    return isLoading ? <Loading /> : <div>{children}</div>;
};

export default AuthRoute;
