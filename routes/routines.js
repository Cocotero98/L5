const routes = require('express').Router();
const validate = require('../middlewares/validation');
const { validationResult } = require('express-validator');
let errors;

const workoutsController = require('../controllers/workouts');

routes.get('/', workoutsController.getAll);

routes.get('/:type', workoutsController.getSingle);

routes.post('/', validate.workoutValidation,
(req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      console.log('errors');
    } else {
      next();
    }
  },workoutsController.addRoutine);

routes.put('/:id',validate.workoutValidation,
(req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      console.log('errors');
    } else {
      next();
    }
  }, workoutsController.updateRoutine);

routes.delete('/:id', workoutsController.deleteWorkout);

module.exports = routes;

//---------NOTAS
//No aparece actualizado en render
//Los routes funcionan bien
// Hay que ver las funciones entrelos
// routes y controller
