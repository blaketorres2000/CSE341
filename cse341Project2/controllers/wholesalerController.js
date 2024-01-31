const { Wholesaler, Med } = require("../models/");
const mongoose = require("mongoose");

const wholesalerController = {};

/************************************************************************************
 * Function to add a new wholesaler pricing info to the database
 ************************************************************************************/
wholesalerController.addWholesaler = async function (req, res) {
  try {
    const { compName, medId, medCost } = req.body;

    // Check if the medId already exists in the collection
    const existingWholesaler = await Wholesaler.findOne({ medId });
    const medication = await Med.findOne({ _id: medId });

    if (existingWholesaler) {
      return res.status(400).json({
        error:
          "This medication already exists in the collection. It can be deleted or updated as needed.",
      });
    }

    const newWholesaler = new Wholesaler({ compName, medId, medCost });

    const savedWholesaler = await newWholesaler.save();

    res.status(201).json({
      message: `Wholesaler pricing for ${medication.medName} ${medication.medCost} added successfully!`,
    });
  } catch (err) {
    console.error("Error adding wholesaler pricing for that medication:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/************************************************************************************
 * Function to get wholesaler pricing info for all meds in the database
 ************************************************************************************/
wholesalerController.getAllWholesalerPricing = async function (req, res) {
  //swagger.tags = ['Wholesalers']
  //swagger.description = ['This is to get a list of all wholesalers from the database.']
  try {
    const wholesalers = await Wholesaler.find({});
    return res.json(wholesalers);
  } catch (err) {
    console.error("Error fetching wholesaler pricing information:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/************************************************************************************
 * Function to update wholesaler pricing info by medId in the database
 ************************************************************************************/
wholesalerController.updateWholesaler = async function (req, res) {
  try {
    const medId = req.params.id;
    const { compName, medCost } = req.body;

    const updatedWholesaler = await Wholesaler.findOneAndUpdate(
      { medId: medId },
      { compName, medCost },
      { new: true }
    );
    const medication = await Med.findOne({ _id: medId });


    if (!updatedWholesaler) {
      return res.status(404).json({ error: "Wholesaler pricing info not found for that medication ID." });
    }

    res.status(201).json({
        message: `Wholesaler pricing for ${medication.medName} ${medication.medCost} updated successfully!`,
    });
  } catch (err) {
    console.error("Error updating wholesaler pricing info for that medication ID:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/************************************************************************************
 * Function to delete wholesaler pricing info for a medication by medId in the database
 ************************************************************************************/
wholesalerController.deleteWholesaler = async function (req, res) {
  try {
    const medId = req.params.id; 

    const deletedWholesaler = await Wholesaler.findOneAndDelete({
      medId: medId,
    });
    const medication = await Med.findOne({ _id: medId });

    if (!deletedWholesaler) {
      return res.status(404).json({ error: "Wholesaler pricing info not found for that medication ID." });
    }

    res.status(201).json({
        message: `Wholesaler pricing for ${medication.medName} ${medication.medCost} deleted successfully!`,
    });
  } catch (err) {
    console.error("Error deleting wholesaler pricing info for that medication ID:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/************************************************************************************
 * Function to get wholesaler pricing info for a med by medId from the database
 ************************************************************************************/
wholesalerController.getWholesalerPricingByMedId = async function (req, res) {
  try {
    const medId = req.params.id; // Assuming req.params.id contains the medId

    const wholesaler = await Wholesaler.findOne({ medId: medId });

    if (!wholesaler) {
      return res.status(404).json({ error: "Wholesaler pricing not found for that medication ID." });
    }

    return res.json(wholesaler);
  } catch (err) {
    console.error("Error fetching wholesaler by medId:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = wholesalerController;
