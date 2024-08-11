import express from "express";
import { Hospital } from "../src/models/Hospital.js";
import mongoose from "mongoose";
import "dotenv/config";
import { MongoClient } from "mongodb";
import cors from "cors";
import bodyParser from "body-parser";
import { UserModel } from "../src/models/User.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

// Connection URL 
const url = "mongodb://localhost:27017/mainhospital";
const client = new MongoClient(url);
const jwtSecret = "lasd4831231#^";

await client.connect();
await mongoose.connect(url);
console.log("Connected successfully to server");

const app = express();
const port = 3000;
// const corsOptions = {
//     origin: ["http://localhost:5173", "http://localhost:5000"],
//     credentials: true,
// };

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/find", async (req, res) => {
    // const specifiedLocation = [78.47465926599587, 17.361631817782975];
    console.log("finding the location");
    console.log(req.body);
    const specifiedLocation = [req.body.longitude, req.body.latitude];
    console.log(specifiedLocation);

    const radiusInMeters = 5000;

    const doc = await Hospital.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: specifiedLocation,
                },
                distanceField: "distance",
                maxDistance: radiusInMeters,
                spherical: true,
            },
        },
        // {
        //     $limit: 5,
        // },
        {
            $sort: {
                distance: 1,
            },
        },
    ]).exec();

    console.log(doc.length);
    console.log(doc);

    res.send(doc);
});

app.post("/register", async (req, res) => {
    const { username, mail, password } = req.body;

    const existingUser = await UserModel.findOne({ email: mail });
    if (existingUser) {
        res.status(200).send({ success: false, msg: "User already exists" });
        return;
    }
    try {
        const EncPassword = await bcrypt.hash(password, 10);

        const createUser = await UserModel.create({
            username,
            email: mail,
            password: EncPassword,
        });
        const token = jwt.sign({ username: username, email: mail }, jwtSecret, {
            expiresIn: "2 days",
        });
        console.log(createUser);

        res.cookie("token", token).send({
            success: true,
            msg: "Account Created Successfully",
            user: createUser,
        });
    } catch (error) {
        console.log(error);
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        const findUser = await UserModel.findOne({ email });
        if (!findUser) {
            res.send({ success: false, msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        if (isMatch) {
            // res.cookie("token", token).send({
            //     success: true,
            //     msg: "Account Created Successfully",
            //     user: findUser,
            // });
            const token = jwt.sign(
                { username: findUser.username, email: findUser.email },
                jwtSecret,
                {
                    expiresIn: "2 days",
                }
            );
            // res.cookie("token", token).send({
            //     success: true,
            //     msg: "Login Successful",
            //     user: findUser,
            // });
            findUser.token = token;
            res.send({
                success: true,
                msg: "Login Successful",
                user: findUser,
            });
        } else {
            res.send({ success: false, msg: "Incorrect Password" });
        }
    } catch (error) {
        console.log(error);
    }
});
app.get("/profile", (req, res) => {
    // res.json("all done")
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        });
    } else {
        res.json(null);
    }
});
app.post("/form", async (req, res) => {
    console.log(req.body);
    const { location } = req.body;
    console.log("the real location is", location);
    // console.log(sym, status,location);
    // console.log("the symptoms are", sym);
    // console.log("the status are", status);
    console.log("the location are", location);
    const specifiedLocation = [req.body.longitude, req.body.latitude];
    const radiusInMeters = 5000;

    // res.send({ success: true, msg: "Emergency Form Submitted Successfully" });
    // if type is emergency

    const doc = await Hospital.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: specifiedLocation,
                },
                distanceField: "distance",
                maxDistance: radiusInMeters,
                spherical: true,
            },
        },
        {
            $match: {
                Specialization: "Super Speciality",
            },
        },
        {
            $sort: {
                distance: 1,
            },
        },
        {
            $limit: 5,
        },
    ]).exec();
    console.log("the emergency data is", doc);
    res.send(doc);
});

app.get("/insurance/:email", async (req, res) => {
    const email = req.params.email;
    console.log(email);
    const user = await UserModel.findOne({ email });
    res.send(user);
});

app.post("/logout", (req, res) => {
    res.clearCookie("token").send({
        success: true,
        msg: "Logged Out Successfully",
    });
});
app.post("/getdata", async (req, res) => {
    const { spec, location, insurance } = req.body;
    console.log(spec);
    console.log("the location are", location);
    console.log(insurance);
    const specifiedLocation = [location.longitude, location.latitude];
    const radiusInMeters = 5000;

    const doc = await Hospital.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: specifiedLocation,
                },
                distanceField: "distance",
                maxDistance: radiusInMeters,
                spherical: true,
            },
        },
        {
            $match: {
                Specialization: spec,
                Insurances: insurance,
            },
        },
        {
            $sort: {
                distance: 1,
            },
        },
        {
            $limit: 5,
        },
    ]).exec();
    console.log(doc)
    res.send({ success: true, msg: "Data Fetched Successfully", doc: doc });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
