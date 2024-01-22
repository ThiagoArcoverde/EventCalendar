import express from 'express'
import cors from 'cors'
import { userRoutes } from './routes/userRoutes.js'
import { eventRoutes } from './routes/eventRoutes.js'
import { inviteRoutes } from './routes/inviteRoutes.js'
import { Database } from './database/database.js'

class App {
    constructor() {
        this.express = express()
        this.express.use(express.json());

        this.setCors()
        this.routes()
        this.syncDatabase()
    }

    setCors() {
        const corsOptions = {
            origin: 'http://localhost:8080',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            optionsSuccessStatus: 204,
        };
        this.express.use(cors(corsOptions));
    }

    routes() {
        this.express.use(userRoutes)
        this.express.use(eventRoutes)
        this.express.use(inviteRoutes)
    }

    syncDatabase() {
        Database.sequelize.sync().then(() => {
            console.log('Tables created successfully!');
        }).catch((error) => {
            console.error('Unable to create tables: ', error);
        });
    }
}

export default new App().express