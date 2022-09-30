const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
let db;
const MONGODB_URI = process.env.MONGODB_URI;

function dbConnect() {
  const uri = MONGODB_URI;

  //Create new client with connection string
  const client = new MongoClient(uri);

  //Wrap our calls to functions that interact with the database in a try/catch statement so that we handle any unexpected errors.

  //Connect to our cluster. Next line returns a promise. We use await to stop further excecution until this is completed
  client
    .connect()
    .then((db = client))
    .catch((err) => {
      throw err;
    });
}

function getDb() {
  dbConnect();
  if (!db) {
    throw Error('Db not initialized');
  }
  return db;
}

module.exports = {
  dbConnect,
  getDb
};
