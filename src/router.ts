import { Application } from "express";
import UserRouter from "./paths/user/routes/";


export default function ROUTER(app) {
    UserRouter(app);
}
