import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import User from "../models/user.js";

const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const admin = new Admin({ name, email, password });
        await admin.save();
        res.status(201).json({ userCreated: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ userCreated: false, error: error.message });
    }
};

const validateAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await Admin.findAndValidate(email, password);
        console.log(foundUser);

        if (!foundUser) {
            res.sendStatus(401);
        } else {
            const token = jwt.sign(
                { email: foundUser.email, name: foundUser.name },
                "secret-key",
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
    const { name, phoneNumber } = req.body;

    try {
        let user = await User.findOne({ phoneNumber });

        if (!user) {
            user = new User({ name, phoneNumber });
            await user.save();
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export default { createAdmin, validateAdmin, saveUsers };
