const { Usage } = require("../models/");
const mongoose = require("mongoose");

const medUsageController = {};

/************************************************************************************
 * Function to get a list of meds used on a certain date from the medUsage collection
 ***********************************************************************************/
medUsageController.getMedUsageByDate = async function (req, res) {
    //swagger.tags = ['Meds']
    //swagger.description = ['This is to get a list of medications used on a certain date from the medUsage collection.\n The apiKey is 5db70934345e409f96cb070e9495asdkjh54s534s2asd35as15a840ffa']
    try {
        const dateParam = req.params.date;

        if (!dateParam) {
            return res.status(400).json({ error: "Date parameter is required. Your fault, not mine!" });
        }

        const usageDate = new Date(dateParam);
        const nextDay = new Date(usageDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const medsUsedOnDate = await Usage.find({
            medUsedDate: {
                $gte: usageDate,
                $lt: nextDay
            }
        });

        return res.json(medsUsedOnDate);
    } catch (err) {
        console.error("Error fetching meds used on date:", err);
        res.status(500).json({ error: "Internal Server Error. Okay, maybe it's my fault." });
    }
};

/************************************************************************************
 * Function to log usage of a med by id
 ***********************************************************************************/
medUsageController.logUsage = async function (req, res) {
    //swagger.tags = ['Meds']
    //swagger.description = ['This is to log the usage of a medication by id in the medUsage collection.\n The apiKey is 5db70934345e409f96cb070e9495asdkjh54s534s2asd35as15a840ffa']
    try {
        const medId = req.params.id;
        const { medUnitsUsed, medEndingInventory, medUsedDate } = req.body;

        // Validate that medId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(medId)) {
            return res.status(400).json({ error: "Invalid med ID. Your fault, not mine!" });
        }

        const med = await Usage.findOne({ medId: medId });

        if (!med) {
            return res.status(404).json({ error: "Medication not found in medUsage collection. Your fault, not mine!" });
        }

        // Create a new Usage entry
        const newUsage = new Usage({
            medId: medId,
            medName: med.medName,
            medStrength: med.medStrength,
            medUnit: med.medUnit,
            medClass: med.medClass,
            medUnitsUsed: medUnitsUsed,
            medEndingInventory: medEndingInventory,
            medUsedDate: medUsedDate,
        });

        const savedUsage = await newUsage.save();

        res.status(201).json(savedUsage);
    } catch (err) {
        console.error("Error logging med usage:", err);
        res.status(500).json({ error: "Internal Server Error. Okay, maybe it's my fault." });
    }
};

module.exports = medUsageController;
