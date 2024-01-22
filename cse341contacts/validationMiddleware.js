const { body, param, validationResult } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'addContact':
      return [
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('email').isEmail(),
        body('favoriteColor').notEmpty(),
        body('birthday').notEmpty(),
      ];
    case 'updateContact':
      return [
        param('id').isMongoId(),
        body('firstName').notEmpty(),
        body('lastName').notEmpty(),
        body('email').isEmail(),
        body('favoriteColor').notEmpty(),
        body('birthday').notEmpty(),
      ];
    case 'deleteContact':
      return [
        param('id').isMongoId(),
      ];

    default:
      return [];
  }
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validate, handleValidationErrors };