import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const createAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const admin = new Admin({ name, email, password });
    await admin.save();

    res.status(201).json({ userCreated: true });
};

const validateAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

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
};

export default { createAdmin, validateAdmin };
