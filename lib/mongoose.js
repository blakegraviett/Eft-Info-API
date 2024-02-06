const mongoose = require('mongoose');

function connectToDB(uri) {
    // CONNECT TO DB
    const connection =  mongoose.connect(uri)

    // CONFIRM CONNTECTION
    if(connection) {
        console.log('SUCCESSFULLY CONNECTED TO DB')
    }

    return connection
}

module.exports = connectToDB
