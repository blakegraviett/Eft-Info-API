// * IMPORTS * //
require('dotenv').config()
const express = require('express');
const app = express()
const connectToDB = require('./lib/mongoose')
const { PORT, SERVER_URL } = require('./lib/constants');

// * MIDDLEWARE * //
app.use(express.json()) // body parser

// * ROUTES * //
// QUEST DB
app.use('/api/v1/quests', require('./routes/quests.routes'));

// ITEMSLIST DB
app.use('/api/v1/itemsList', require('./middleware/auth.middleware'), require('./routes/itemsList.routes'));

// AUTH 
app.use('/api/v1/auth', require('./routes/auth.routes'));

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

