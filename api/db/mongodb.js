const mongoose = require('mongoose');
const config = require('./config');

// Use native promises
mongoose.Promise = global.Promise; // es6 promises

const connectionURL = `mongodb://${config.db.user}@${config.db.host}:${config.db.port}/${config.db.name}`;
mongoose.connect(connectionURL, {useNewUrlParser: true}).catch((e) => console.error(e));
const db = mongoose.connection;

// Check connection
db.on('connected', () => {
    console.log(`mongoose connection is open on ${connectionURL}`);
});

// Check for db error
db.on('error', (err) => console.error(err));

// Check for disconnected
db.on('disconnected', () => {
    console.log('mongoose is disconnected')
});

process.on('SIGINT', () => {
   db.close(() =>{
       console.log('mongoose connection closed trow app terminated');
       process.exit(0);
   });
});

