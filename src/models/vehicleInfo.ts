// model, number plate (number and image), image, vehicle Card (front- back)
import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type VehicleInfoDocument = Document & {
    model: string;
    plateNumber: string;
    plateImage: string;
    vehicleImage: string;
    cardFront: string;
    cardBack: string;
    status: string;
}


const vehicleInfoSchema = sequelize.define("vehicleInfos",
    {
        model: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { timestamps: true, }
)

export default vehicleInfoSchema
