const { body, param, validationResult } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'getContact':
        return [
          param('id').isMongoId().withMessage('Invalid contact ID'),
        ];  
    case 'addContact':
      return [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
        body('birthday').notEmpty().withMessage('Birthday is required'),
      ];
    case 'updateContact':
      return [
        param('id').isMongoId().withMessage('Invalid contact ID'),
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
        body('birthday').notEmpty().withMessage('Birthday is required'),
      ];
    case 'deleteContact':
      return [
        param('id').isMongoId().withMessage('Invalid contact ID'),
      ];

    default:
      return [];
  }
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({ field: error.param, message: error.msg }));
    return res.status(400).json({ errors: formattedErrors });
  }
  next();
};

module.exports = { validate, handleValidationErrors };