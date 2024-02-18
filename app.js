// * IMPORTS * //
require('dotenv').config()
const express = require('express');
const app = express()
const connectToDB = require('./lib/mongoose')
const { PORT, SERVER_URL } = require('./lib/constants');

// * SECURITY * //
const helment = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// * MIDDLEWARE * //
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // limit each IP to 100 requests per window (15 mins)
  }),
); // Rate Limit
app.use(express.json()); // Body Parser
app.use(helment()); // Header Security
app.use(cors()); // CORS
app.use(xss()); // XSS

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

