import { Socket } from "socket.io";
import { Op } from "sequelize"
import { Server, } from "socket.io";
import R_quickService from "../services/R_quick";
import RC_quickService from "../services/RC_quick";
import UserService from "../services/user";
import RiderService from "../services/rider";

import R_quick from "./R_quick"
import { notify } from '../util/notification';

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
                let result = await R_quickService.updateById(id, { status: "cancelled", });
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
                // console.log(data);

                const riders = await RiderService.findAll();
                for (const rider of riders) {
                    // riderNSP.emit("newRideQuick", rider);
                    notify(rider.dataValues.fcmToken, "New Ride", `New Ride request of price ${data.bidPrice} has been made`)
                }
                const fifteenMinutesAgo = new Date(new Date().getTime() - 15 * 60 * 1000);
                const oldRide = await R_quickService.findByQuery({
                    createdAt: {
                        [Op.gte]: fifteenMinutesAgo,
                    },
                    user: data.user,
                });
                if (oldRide.length > 0) {
                    for (const ride of oldRide) {
                        await R_quickService.updateById(ride.dataValues.id, { status: "cancelled", });
                    }
                }

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
        const riders = await RiderService.findAll();
        for (const rider of riders) {
            // riderNSP.emit("newRideQuick", rider);
            notify(rider.dataValues.fcmToken, "Test", `Test notifications`)
        }
        console.log("rider connected");
        const rides = await R_quickService.findAll();
        const final = [];
        for (const one of rides) {
            console.log(one);
            const userData = await UserService.findById(one.dataValues.user);
            const categoryData = await RC_quickService.findById(one.dataValues.category);
            final.push({ doc: one?.dataValues, userData: userData?.dataValues, categoryData: categoryData?.dataValues });
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



