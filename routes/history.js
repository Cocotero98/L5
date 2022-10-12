const routes = require('express').Router();
const validate = require('../middlewares/validation');
const { validationResult } = require('express-validator');
let errors;

const historyController = require('../controllers/history');
const { requiresAuth } = require('express-openid-connect');

routes.get('/:client_id', historyController.getAll);

routes.post('/', requiresAuth(),validate.workoutValidation,
(req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      console.log('errors');
    } else {
      next();
    }
  },historyController.addRoutine);

routes.put('/:id',requiresAuth(),validate.workoutValidation,
(req, res, next) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      console.log('errors');
    } else {
      next();
    }
  }, historyController.updateRoutine);

routes.delete('/:id', requiresAuth(), historyController.deleteWorkout);

module.exports = routes;

//---------NOTAS
//No aparece actualizado en render
//Los routes funcionan bien
// Hay que ver las funciones entrelos
// routes y controller
