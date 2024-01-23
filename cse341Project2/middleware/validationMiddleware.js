const { body, param, validationResult } = require("express-validator");

const validate = (method) => {
  switch (method) {
    // Validation to get a medication by its ID number from the medlist collection
    case "getMedById":
      return [param("id").isMongoId().withMessage("Invalid contact ID")];

    // Validation to get a medication by its ID number from the medlist collection
    case "getMedByName":
      return [param("name").notEmpty().withMessage("Must provide a medication name")];

    // Validation to add a medication to the medList collection
    case "addMed":
      return [
        body("medName").notEmpty().withMessage("Medication name is required"),
        body("medStrength")
          .notEmpty()
          .withMessage("Medication strength is required"),
        body("medUnit")
          .notEmpty()
          .withMessage("Medication unit type is required"),
        body("medClass")
          .notEmpty()
          .isNumeric()
          .withMessage("Medication schedule class is required"),
        body("medInventory")
          .notEmpty()
          .isNumeric()
          .withMessage("Medication inventory count is required"),
        body("medThreshold")
          .notEmpty()
          .isNumeric()
          .withMessage("Medication minimum threshold is required"),
      ];

    // Validation to update a medication in the medList collection
    case "updateMed":
      return [
        param("id").isMongoId().withMessage("Invalid medication ID"),
        body("medName").notEmpty().withMessage("Medication name is required"),
        body("medStrength")
          .notEmpty()
          .withMessage("Medication strength is required"),
        body("medUnit")
          .notEmpty()
          .withMessage("Medication unit type is required"),
        body("medClass")
          .notEmpty()
          .isNumeric()
          .withMessage("Medication schedule class is required"),
        body("medInventory")
          .notEmpty()
          .isNumeric()
          .withMessage("Medication inventory count is required"),
        body("medThreshold")
          .notEmpty()
          .isNumeric()
          .withMessage("Medication minimum threshold is required"),
      ];
    
    // Validation to delete a medication from the medList collection
    case "deleteMed":
      return [param("id").isMongoId().withMessage("Invalid medication ID")];

    // Validation to log the usage of a medication in the medUsage collection
    case "logUsage":
      return [
        param("id").isMongoId().withMessage("Invalid medication ID"),
        body("medUnitsUsed")
          .notEmpty()
          .isNumeric()
          .withMessage("Medication units used is required"),
        body("medEndingInventory")
          .notEmpty()
          .isNumeric()
          .withMessage("Medication ending inventory is required"),
        body("medUsedDate")
          .notEmpty()
          .isDate()
          .withMessage("Medication usage date is required in this format: YYYY-MM-DD"),
      ];

    // Validation to meds used on a certain date from the medUsage collection
    case "getUsage":
        return [
            param("date").isDate().withMessage("A valid date must be entered.")
        ];

    default:
      return [];
  }
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors
      .array()
      .map((error) => ({ field: error.param, message: error.msg }));
    return res.status(400).json({ errors: formattedErrors });
  }
  next();
};

module.exports = { validate, handleValidationErrors };
