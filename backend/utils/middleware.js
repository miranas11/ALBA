import jwt from "jsonwebtoken";
import config from "../config.js";

const isAuthorized = (req, res, next) => {
    const header = req.headers["authorization"];

    const token = header.slice(7);

    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, config.secretKey, (err, user) => {
        if (err) {
            return res
                .status(500)
                .json({ error: "Failed to authenticate token" });
        }

        req.user = user;

        next();
    });
};

export default { isAuthorized };
