const routes = require('express').Router();

const workoutsController = require('../controllers/workouts');

routes.get('/', workoutsController.getAll);

routes.get('/:type', workoutsController.getSingle);

routes.post('/', workoutsController.addRoutine);

module.exports = routes;

//---------NOTAS
//No aparece actualizado en render
//Los routes funcionan bien
// Hay que ver las funciones entrelos
// routes y controller
