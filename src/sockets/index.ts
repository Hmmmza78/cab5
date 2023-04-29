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
        socket.on("cancelRideQuick", async (id, cb) => {
            try {
                // console.log(id);
                let result = await R_quickService.updateById({ status: "cancelled", }, id);
                console.log(result);
                cb({ status: "success", data: result });
                riderNSP.emit("cancelRideQuick", result);
                // console.log("cancelRideQuick", "success");
            } catch (error) {
                cb({ status: "error", message: error.message });
            }

        })

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
            const userData = await UserService.findById(one.dataValues.user);
            const categoryData = await RC_quickService.findById(one.dataValues.category);
            final.push({ doc: one.dataValues, userData, categoryData });
        }
        console.log(final);

        riderNSP.emit("newRideQuick", { data: final });
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



