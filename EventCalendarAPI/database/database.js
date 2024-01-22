import { Sequelize } from "sequelize";
import 'dotenv/config'

var Database = {}

Database.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
})

// User Schema
Database.user = Database.sequelize.define('user', {
    name: {
        type: "VARCHAR(255)",
        allowNull: false
    },
    password: {
        type: "VARCHAR(500)",
        allowNull: false
    },
    email: {
        type: "VARCHAR(255)",
        allowNull: false
    }
})

// Event Schema
Database.event = Database.sequelize.define('event', {
    title: {
        type: "VARCHAR(255)",
        allowNull: false
    },
    description: {
        type: "VARCHAR(255)",
        allowNull: false
    },
    initialDate: {
        type: "DATETIME",
        allowNull: false
    },
    finalDate: {
        type: "DATETIME",
        allowNull: false
    }
})

Database.event.belongsTo(Database.user, {
    foreignKey: 'userId', allowNull: false,
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

// Invite Schema
Database.invite = Database.sequelize.define('invite', {
    accepted: {
        type: "BOOLEAN",
        allowNull: false,
        defaultValue: false
    }
})
Database.invite.belongsTo(Database.user, {
    foreignKey: 'inviterId', allowNull: false,
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})
Database.invite.belongsTo(Database.user, {
    foreignKey: 'invitedId', allowNull: false,
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})
Database.invite.belongsTo(Database.event, {
    foreignKey: 'eventId', allowNull: false,
    onDelete: 'CASCADE', onUpdate: 'CASCADE'
})

export { Database }
