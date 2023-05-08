import { Sequelize, Dialect } from "sequelize";


const dbConfig = {
    HOST: 'localhost',
    PORT: '8000',
    USER: 'root',
    PASSWORD: 'helloWorld',
    DB: 'cab5',
    dialect: 'mysql' as Dialect,

    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
}


export const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        // operatorsAliases:false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            idle: dbConfig.pool.idle,
            acquire: dbConfig.pool.acquire,
        }
    }
)

sequelize.authenticate().then(() => {
    console.log('Connected to database')
    console.log('Creating tables')
}).catch((err) => {
    console.log(err)
})


const db: any = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


db.sequelize.sync({ force: false }).then(() => {
    console.log('Yes Re-Sync Complete')
})




export default db;
