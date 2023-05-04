"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const R_quick_1 = __importDefault(require("../services/R_quick"));
const RC_quick_1 = __importDefault(require("../services/RC_quick"));
const user_1 = __importDefault(require("../services/user"));
const rider_1 = __importDefault(require("../services/rider"));
const bidQuick_1 = __importDefault(require("../services/bidQuick"));
const notification_1 = require("../util/notification");
function socket(io) {
    return __awaiter(this, void 0, void 0, function* () {
        let userNSP = io.of('/user');
        let riderNSP = io.of('/rider');
        // R_quick(io);
        // let socketUser = {};
        // io.on("connection", async (socket: Socket) => {
        // });
        function sendRideStatus({ status, message }) {
            userNSP.emit("rideStatus", { status, message });
        }
        userNSP.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const bids = yield bidQuick_1.default.findAll();
            const final = [];
            for (const bid of bids) {
                const riderData = (_a = (yield user_1.default.findById(bid.dataValues.rider))) === null || _a === void 0 ? void 0 : _a.dataValues;
                const rideData = (_b = (yield R_quick_1.default.findById(bid.dataValues.ride))) === null || _b === void 0 ? void 0 : _b.dataValues;
                const categoryData = (_c = (yield RC_quick_1.default.findById(rideData.category))) === null || _c === void 0 ? void 0 : _c.dataValues;
                final.push({ bid: bid.dataValues, riderData, categoryData });
            }
            console.log(final, "final, dataValues");
            userNSP.emit("allBids", final);
            console.log("user connected");
            socket.on("cancelRideQuick", ({ id, reason }, cb) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // console.log(id);
                    let result = yield R_quick_1.default.updateById(id, { status: "cancelled", });
                    console.log(result);
                    const finalResult = yield R_quick_1.default.findById(id);
                    cb({ status: "success", data: finalResult });
                    riderNSP.emit("cancelRideQuick", finalResult);
                    // console.log("cancelRideQuick", "success");
                }
                catch (error) {
                    cb({ status: "error", message: error.message });
                }
            }));
            socket.on("newRideQuick", (data, cb) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // console.log(data);
                    const riders = yield rider_1.default.findAll();
                    for (const rider of riders) {
                        // riderNSP.emit("newRideQuick", rider);
                        (0, notification_1.notify)(rider.dataValues.fcmToken, "New Ride", `New Ride request of price ${data.bidPrice} has been made`);
                    }
                    const fifteenMinutesAgo = new Date(new Date().getTime() - 15 * 60 * 1000);
                    const oldRide = yield R_quick_1.default.findByQuery({
                        createdAt: {
                            [sequelize_1.Op.gte]: fifteenMinutesAgo,
                        },
                        user: data.user,
                    });
                    if (oldRide.length > 0) {
                        for (const ride of oldRide) {
                            yield R_quick_1.default.updateById(ride.dataValues.id, { status: "cancelled", });
                        }
                    }
                    let result = yield R_quick_1.default.create(data);
                    console.log(result);
                    cb({ status: "success", data: result });
                    riderNSP.emit("newRideQuic", result);
                    console.log("newRideQuick", "success");
                }
                catch (error) {
                    cb({ status: "error", message: error.message });
                }
            }));
            socket.on("acceptRideQuick", (bid, cb) => __awaiter(this, void 0, void 0, function* () {
                var _d, _e;
                try {
                    // console.log(bid);
                    const bidData = (_d = (yield bidQuick_1.default.findById(bid))) === null || _d === void 0 ? void 0 : _d.dataValues;
                    let result = yield R_quick_1.default.updateById(bidData === null || bidData === void 0 ? void 0 : bidData.ride, { status: "accepted", rider: bidData === null || bidData === void 0 ? void 0 : bidData.rider });
                    // console.log(result);
                    const finalData = (_e = (yield R_quick_1.default.findById(bidData === null || bidData === void 0 ? void 0 : bidData.ride))) === null || _e === void 0 ? void 0 : _e.dataValues;
                    cb({ status: "success", data: finalData });
                    riderNSP.emit("acceptRideQuick", finalData);
                    console.log("acceptRideQuick", "success");
                }
                catch (error) {
                    cb({ status: "error", message: error.message });
                }
            }));
            socket.on("disconnect", () => {
                console.log("user disconnected");
            });
        }));
        riderNSP.on("connection", (socket) => __awaiter(this, void 0, void 0, function* () {
            var _f;
            const riders = yield rider_1.default.findAll();
            for (const rider of riders) {
                // riderNSP.emit("newRideQuick", rider);
                (0, notification_1.notify)(rider.dataValues.fcmToken, "Test", `Test notifications`);
            }
            (0, notification_1.notify)((_f = (yield rider_1.default.findById(1))) === null || _f === void 0 ? void 0 : _f.dataValues.fcmToken, "Test", `Test notifications`);
            console.log("rider connected");
            const rides = yield R_quick_1.default.findAll();
            const final = [];
            for (const ride of rides) {
                console.log(ride);
                const userData = yield user_1.default.findById(ride.dataValues.user);
                const categoryData = yield RC_quick_1.default.findById(ride.dataValues.category);
                final.push({ doc: ride === null || ride === void 0 ? void 0 : ride.dataValues, userData: userData === null || userData === void 0 ? void 0 : userData.dataValues, categoryData: categoryData === null || categoryData === void 0 ? void 0 : categoryData.dataValues });
            }
            console.log(final);
            socket.on("sendBidQuick", (data, cb) => __awaiter(this, void 0, void 0, function* () {
                var _g;
                const bid = yield bidQuick_1.default.create(data);
                const rideData = (yield R_quick_1.default.findById(bid.dataValues.ride)).dataValues;
                const riderData = (yield rider_1.default.findById(bid.dataValues.rider)).dataValues;
                const bids = yield bidQuick_1.default.findByQuery({ ride: data.ride });
                const final = [];
                for (const bid of bids) {
                    const riderData = (_g = (yield user_1.default.findById(bid.dataValues.rider))) === null || _g === void 0 ? void 0 : _g.dataValues;
                    final.push({ bid: bid.dataValues, riderData });
                }
                console.log(final, "final, dataValues");
                userNSP.emit("allBids", final);
            }));
            riderNSP.emit("newRideQuick", { data: final });
            socket.on("join", (data) => {
                console.log(data);
            });
            riderNSP.emit("join", "hello");
            socket.on("disconnect", () => {
                console.log("rider disconnected");
            });
        }));
        // console.log("woowowowowow");
    });
}
exports.default = socket;
