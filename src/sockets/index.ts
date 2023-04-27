import { Socket } from "socket.io";
import { Server, } from "socket.io";

import R_quick from "./R_quick"

export default async function socket(io: Server) {
    R_quick(io);
    // let socketUser = {};
    // io.on("connection", async (socket: Socket) => {
    // });
}



