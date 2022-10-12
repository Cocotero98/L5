const mongodb = require('../model/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const client_id = req.params.client_id;
  try {
    const db = await mongodb.getDb();
    // const db = await mongodb.getDb()
    const result = db.db('workouts').collection('history').find({client_id:client_id});
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

const addRoutine = async (req, res) => {
  const workout = {
    client_id: req.body.client_id,
    type: req.body.type,
    routine: req.body.routine
};
  const db = await mongodb.getDb();
  db.db('workouts')
    .collection('history')
    .insertOne(workout, (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result.result);
    });
};

const updateRoutine = async (req, res) =>{
  const id = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const response = await db.db('workouts')
    .collection('history')
    .updateOne(
      { _id: id },
      {
        $set: {
        type: req.body.type,
        routine: req.body.routine
      }
    }
  );
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the routine.');
  }
}

const deleteWorkout = async (req, res)=>{
  const id = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const response = await db.db('workouts')
    .collection('history')
    .deleteOne({_id : id})
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the routine.');
    }
}

module.exports = { getAll, addRoutine, updateRoutine, deleteWorkout};
