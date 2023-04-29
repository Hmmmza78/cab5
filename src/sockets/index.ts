import { Socket } from "socket.io";
import { Server, } from "socket.io";

import R_quick from "./R_quick"

export default async function socket(io: Server) {

    let userNSP = io.of('/user');
    let riderNSP = io.of('/rider');
    R_quick(io);
    // let socketUser = {};
    // io.on("connection", async (socket: Socket) => {
    // });

    userNSP.on("connection", async (socket: Socket) => {
        console.log("user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
    riderNSP.on("connection", async (socket: Socket) => {
        console.log("rider connected");
        socket.on("disconnect", () => {
            console.log("rider disconnected");
        });
    });
}



