import express, { Application } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

import ROUTER from "./router";
ROUTER(app);
app.get("/", (req, res) => { res.json({ message: "hello" }) })

import errorHandler from "./middlewares/apiErrorHandler"
app.use(errorHandler)

export default app;
