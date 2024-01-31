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
          "This medication already exists in the collection. It can be deleted or updated.",
      });
    }

    const newWholesaler = new Wholesaler({ compName, medId, medCost });

    const savedWholesaler = await newWholesaler.save();

    res.status(201).json({
      message: `Wholesaler pricing for ${medication.medName} added successfully!`,
    });
  } catch (err) {
    console.error("Error adding wholesaler:", err);
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
    console.error("Error fetching wholesalers:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/************************************************************************************
 * Function to update wholesaler pricing info by medId in the database
 ************************************************************************************/
wholesalerController.updateWholesaler = async function (req, res) {
  try {
    const medId = req.params.id; // Assuming req.params.id contains the medId
    const { compName, medCost } = req.body;

    const updatedWholesaler = await Wholesaler.findOneAndUpdate(
      { medId: medId },
      { compName, medCost },
      { new: true }
    );

    if (!updatedWholesaler) {
      return res.status(404).json({ error: "Wholesaler not found." });
    }

    res.status(201).json({
      message: `${updatedWholesaler.compName} updated as a wholesaler successfully!`,
    });
  } catch (err) {
    console.error("Error updating wholesaler:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

/************************************************************************************
 * Function to delete wholesaler pricing info for a medication by medId in the database
 ************************************************************************************/
wholesalerController.deleteWholesaler = async function (req, res) {
  try {
    const medId = req.params.id; // Assuming req.params.id contains the medId

    const deletedWholesaler = await Wholesaler.findOneAndDelete({
      medId: medId,
    });

    if (!deletedWholesaler) {
      return res.status(404).json({ error: "Wholesaler not found." });
    }

    res.status(201).json({
      message: `${deletedWholesaler.compName} deleted as a wholesaler successfully`,
    });
  } catch (err) {
    console.error("Error deleting wholesaler:", err);
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
      return res.status(404).json({ error: "Wholesaler not found." });
    }

    return res.json(wholesaler);
  } catch (err) {
    console.error("Error fetching wholesaler by medId:", err);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

module.exports = wholesalerController;
