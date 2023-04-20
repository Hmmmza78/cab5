import { Server as HTTPServer } from "http"
import { Socket } from "socket.io";
import { Server, } from "socket.io";

import R_quick from "./sockets/R_quick"

export default async function socket(server: HTTPServer) {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });
    R_quick(io);
    // let socketUser = {};
    // io.on("connection", async (socket: Socket) => {
    // });
}



