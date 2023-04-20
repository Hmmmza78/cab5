import { Server } from "socket.io"

export default async function (io: Server) {
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
}

// function to get sum of three numbers
function sum(a: number, b: number, c: number) {
    return a + b + c;
}
