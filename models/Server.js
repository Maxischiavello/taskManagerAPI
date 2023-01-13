require('dotenv').config({ path: '.env' })
const express = require('express')
const cors = require('cors')
const DB = require('../helpers/DB')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 8080
        // path 
    }

    listen() {
        DB.connect().then(() => {
            this.middlewares()

            //this.routes()

            this.app.listen(this.port, () => {
                console.log('Server listening on', this.port)
            })
        })
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json({ extended: true }))
    }

    //routes(){}
}

module.exports = Server