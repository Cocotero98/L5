const mongodb = require('../model/connection');
const ObjectId = require('mongodb').ObjectId;

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

const addRoutine = async (req, res) => {
  const workout = {
    type: req.body.type,
    routine: req.body.routine
};
  const db = await mongodb.getDb();
  db.db('workouts')
    .collection('routines')
    .insertOne(workout, (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.send(result.result);
    });
};

const updateRoutine = async (req, res) =>{
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const response = await db.db('workouts')
    .collection('routines')
    .updateOne(
      { _id: userId },
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
  const userId = new ObjectId(req.params.id);
  const db = await mongodb.getDb();
  const response = await db.db('workouts')
    .collection('routines')
    .deleteOne({_id : userId})
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the routine.');
    }
}

module.exports = { getAll, getSingle, addRoutine, updateRoutine, deleteWorkout};
