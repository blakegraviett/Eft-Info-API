// * IMPORTS * //
require('dotenv').config()
const express = require('express');
const app = express()
const connectToDB = require('./lib/mongoose')
const { PORT, SERVER_URL } = require('./lib/constants');

// * MIDDLEWARE * //
app.use(express.json()) // body parser

// * ROUTES * //
app.use('/eft-info/api/v1/quests', require('./routes/quests.routes'));

// 404 ERROR
app.use(require('./middleware/404.middleware'))

// * SERVER * //
async function startBackend(){
    try {
        // CONNECT TO DB
        connectToDB(process.env.MONGO_DB_URI)

        // LISTEN TO SERVER
        app.listen(PORT, console.log(`Server listening on ${SERVER_URL}`));
    }

    catch (err) {
        console.error(err)
    }

}

// * CALL SERVER * //
startBackend()

