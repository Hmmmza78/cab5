import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type RiderDocument = Document & {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    fcmToken: string;
    currLat: string;
    currLon: string;
    image: string;
    dob: string;
}


const riderSchema = sequelize.define("users",
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fcmToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currLat: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currLon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "pending",
        }
    },
    { timestamps: true, }
)

export default riderSchema