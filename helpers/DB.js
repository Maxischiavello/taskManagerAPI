require('dotenv').config({ path: '.env' })
const mongoose = require('mongoose')

class DB {
    connect = () => {
        return new Promise((resolve) => {
            mongoose.set('strictQuery', false)

            mongoose.connect(process.env.MONGODB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })

            const db = mongoose.connection

            db.on('error', () => {
                console.error('There was an error to connect to DB')
                resolve(db)
                process.exit(1)
            })

            db.once('open', () => {
                console.log('DB connected')
                resolve(db)
            })
        })
    }

    async disconnect() {
        await mongoose.disconnect()
        console.log('DB disconnected')
    }
}

module.exports = new DB()