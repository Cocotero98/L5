const { check } = require('express-validator');


exports.workoutValidation = [
  check('type', 'Type is required.').not().isEmpty(),
  check('type', 'Please insert a valid value.').isString(),
  check('routine').custom((obj)=>{
    for (const key in obj){
      if (typeof(key) != 'string' || key.length < 1 || obj[key].length < 1) {
        return Promise.reject('Please, enter valid values for the exercises.');
    } else{return true}
    }
  })
];
