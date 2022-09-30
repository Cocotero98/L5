const mongodb = require('../model/connection');
// const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const db = await mongodb.getDb();
    // const db = await mongodb.getDb()
    const result = db.db('workouts').collection('routines').find();
    result
      .toArray()
      .then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
        console.log(lists);
      })
      .catch((e) => {
        console.error(e);
      });
  } catch (e) {
    console.error(e);
  }
};

const getSingle = async (req, res) => {
  const type = req.params.type;
  try {
    const db = await mongodb.getDb();
    const result = db.db('workouts').collection('routines').find({ type: type });
    result
      .toArray()
      .then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      })
      .catch((e) => {
        console.error(e);
      });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { getAll, getSingle};
