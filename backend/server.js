import express from "express";
import config from "./config.js";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import propertyRoute from "./routes/propertyRoute.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/ALBA")
    .then(() => {
        console.log("Connection Open");
    })
    .catch((e) => {
        console.log("ERROR");
    });

app.listen(config.port, () => {
    console.log(`Listening on Port ${config.port}`);
});

app.use("/auth", authRoute);
app.use("/property", propertyRoute);
