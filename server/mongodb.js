const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Use JavaScript promises
const { Mongo } = require('../environment');
const user = Mongo.USER? `${Mongo.USER}:${Mongo.PASS}@`: "";

const uri = `mongodb://${user}${Mongo.HOST}:${Mongo.PORT}/${Mongo.NAME}`;
console.log(uri);
/**
 , {
  auth: { authSource: Mongo.AUTH },
  user: Mongo.USER,
  pass: Mongo.PASS
}
 */
const db = mongoose.createConnection(uri);
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = db;
