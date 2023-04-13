import express, { Application } from "express";

const app = express();

import ROUTER from "./router";
ROUTER(app);

import errorHandler from "./middlewares/apiErrorHandler"
app.use(errorHandler)

export default app;
