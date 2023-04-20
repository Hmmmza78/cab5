import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type R_quickDocument = Document & {
    name: string;
    logo: string;
    priceKm: string;
    status: string;
}


const R_quickSchema = sequelize.define("R_quick",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        priceKm: {
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

export default R_quickSchema
