import { Socket } from "socket.io";
import { Server, } from "socket.io";
import R_quickService from "../services/R_quick";
import RC_quickService from "../services/RC_quick";
import UserService from "../services/user";

import R_quick from "./R_quick"

export default async function socket(io: Server) {

    let userNSP = io.of('/user');
    let riderNSP = io.of('/rider');
    // R_quick(io);
    // let socketUser = {};
    // io.on("connection", async (socket: Socket) => {
    // });

    userNSP.on("connection", async (socket: Socket) => {
        console.log("user connected");

        socket.on("newRideQuick", async (data, cb) => {
            try {
                console.log(data);
                let result = await R_quickService.create(data);
                console.log(result);
                cb({ status: "success", data: result });
                riderNSP.emit("newRideQuic", result);
                console.log("newRideQuick", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
            }
        });
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });

    });
    riderNSP.on("connection", async (socket: Socket) => {
        console.log("rider connected");
        const rides = await R_quickService.findAll();
        const final = [];
        for (const one of rides) {
            console.log(one);

            const userData = await UserService.findById(one.toJSON().user);
            const categoryData = await RC_quickService.findById(one.toJSON().category);
            final.push({ doc: one, userData });
        }
        riderNSP.emit("newRideQuick", rides[0]);
        socket.on("join", (data) => {
            console.log(data);
        });
        riderNSP.emit("join", "hello");
        socket.on("disconnect", () => {
            console.log("rider disconnected");
        });
    });
    // console.log("woowowowowow");

}



