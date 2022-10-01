const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
let db;

function dbConnect() {
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1vqmd5v.mongodb.net/?retryWrites=true&w=majority&authSource=admin`;

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
