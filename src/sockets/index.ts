import { Socket } from "socket.io";
import { Server, } from "socket.io";
import R_quickService from "../services/R_quick";

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



