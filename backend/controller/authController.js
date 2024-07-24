import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import User from "../models/user.js";
import config from "../config.js";

const validateToken = async (req, res) => {
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

        res.status(201).json({ message: "Token Validated" });
    });
};

const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const admin = new Admin({ name, email, password });
        await admin.save();
        const token = jwt.sign(
            { email: admin.email, name: admin.name },
            config.secretKey,
            { expiresIn: "1h" }
        );
        res.status(201).json({ userCreated: true, token: token });
    } catch (error) {
        console.error(error.code);
        res.status(500).json({
            userCreated: false,
            message: error.code == 11000 ? "Duplicate Email" : error.message,
        });
    }
};

const validateAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await Admin.findAndValidate(email, password);

        if (!foundUser) {
            res.status(401).json({ message: "Wrong Credentials" });
        } else {
            const token = jwt.sign(
                { email: foundUser.email, name: foundUser.name },
                config.secretKey,
                { expiresIn: "1h" }
            );
            res.status(200).json({ token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const saveUsers = async (req, res) => {
    const { name, phoneNumber, email } = req.body;

    try {
        let user = await User.findOne({ phoneNumber });

        if (!user) {
            user = new User({ name, phoneNumber, email });
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default { createAdmin, validateAdmin, saveUsers, validateToken };
