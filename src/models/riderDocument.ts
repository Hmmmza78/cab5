/*fron-back{
 cnic,
}
drivingLicense (image and number)

*/
import { sequelize } from '../config/db';
import { DataTypes } from "sequelize"

export type RiderDocumentDocument = Document & {
    cnicFront: string;
    cnicBack: string;
    licenseImage: string;
    licenseNumber: string;
    status: string;
}


const riderDocumentSchema = sequelize.define("riderDocument",
    {
        cnicFront: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        cnicBack: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        licenseImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        licenseNumber: {
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

export default riderDocumentSchema
