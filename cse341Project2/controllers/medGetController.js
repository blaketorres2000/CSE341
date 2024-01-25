const { Med } = require("../models/");
const mongoose = require("mongoose");

const medGetController = {};

/*********************************************************
 * Function to get a list of all medications from the database.
 ********************************************************/
medGetController.listAllMeds = async function (req, res) {
  //swagger.tags = ['Meds']
  //swagger.description = ['This is to get a list of all medications from the database.']
  try {
    const meds = await Med.find({});
    return res.json(meds);
  } catch (err) {
    console.error("Error fetching medications:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error." });
  }
};

/*********************************************************
 * Function to get a medication by its ID from the database.
 ********************************************************/
medGetController.getMedById = async function (req, res) {
  //swagger.tags = ['Meds']
  //swagger.description = ['This is to get a medication by its ID from the database.']
  try {
    const param = req.params.id;
    const isObjectId = mongoose.Types.ObjectId.isValid(param);

    if (!isObjectId) {
      return res
        .status(400)
        .json({ error: "Invalid medication ID. Must be a valid ObjectId." });
    }

    // If param is a valid Id, search by medId
    const med = await Med.findById(param);

    if (!med) {
      return res
        .status(404)
        .json({ error: "Medication not found." });
    }

    return res.json(med);
  } catch (err) {
    console.error("Error fetching medication by ID:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error." });
  }
};

/*********************************************************
 * Function to get medications from the database by name.
 ********************************************************/
medGetController.getMedByName = async function (req, res) {
  //swagger.tags = ['Meds']
  //swagger.description = ['This is to find medications by name from the database.']
  try {
    const paramName = req.params.name;

    if (!paramName) {
      return res.status(400).json({
        error: "Medication name parameter is required.",
      });
    }

    const meds = await Med.find({
      medName: { $regex: new RegExp(paramName, "i") },
    });

    if (!meds || meds.length === 0) {
      return res.status(404).json({
        error:
          "No medications found with the specified name.",
      });
    }

    return res.json(meds);
  } catch (err) {
    console.error("Error finding medications by name:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error." });
  }
};

module.exports = medGetController;
