import { Server as HTTPServer } from "http"
import { Socket } from "socket.io"
import { Server, } from "socket.io"


export default async function socket(server: HTTPServer) {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    });
    let socketUser = {};
    io.on("connection", async (socket: Socket) => {
    });
}



