const { Med, Usage } = require("../models/");
const mongoose = require("mongoose");

const medUsageController = {};

/************************************************************************************
 * Function to get a list of meds used on a certain date from the medUsage collection
 ***********************************************************************************/
medUsageController.getMedUsageByDate = async function (req, res) {
    //swagger.tags = ['Meds']
    //swagger.description = ['This is to get a list of medications used on a certain date from the medUsage collection.']
    try {
        const dateParam = req.params.date;

        if (!dateParam) {
            return res.status(400).json({ error: "Date parameter is required using date format YYYY-MM-DD" });
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
        console.error("Error fetching meds used on requested date:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/************************************************************************************
 * Function to get a list of usage results by id from the medUsage collection
***********************************************************************************/
medUsageController.getMedUsageById = async function (req, res) {
    //swagger.tags = ['Meds']
    //swagger.description = ['This is to get a list of usage results by id from the medUsage collection.']
    try {
        const idParam = req.params.id;
    
        if (!idParam) {
          return res
            .status(400)
            .json({ error: "Invalid medication ID." });
        }
    
        // If param is a valid Id, search by medId
        const med = await Usage.find({ medId: idParam });
    
        if (!med) {
          return res
            .status(404)
            .json({ error: "Medication usage not found for requested medication ID." });
        }
    
        return res.json(med);
      } catch (err) {
        console.error("Error fetching medication usage for requested medication ID:", err);
        res
          .status(500)
          .json({ error: "Internal Server Error." });
      }
    };
    
/************************************************************************************
 * Function to log usage of a med by id
 ***********************************************************************************/
medUsageController.logUsage = async function (req, res) {
    try {
        const medId = req.params.id;
        const { medUnitsUsed, medUsedDate } = req.body;

        // Validate that medId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(medId)) {
            return res.status(400).json({ error: "Invalid med ID." });
        }

        // Fetch the medication information from the medList collection
        const med = await Med.findById(medId);

        if (!med) {
            return res.status(404).json({ error: "Medication not found in medList collection." });
        }

        // Calculate the new inventory after usage
        const newInventory = med.medInventory - medUnitsUsed;

        // Update the inventory in the medList collection
        await Med.findByIdAndUpdate(medId, { medInventory: newInventory });

        // Create a new Usage entry
        const newUsage = new Usage({
            medId: medId,
            medName: med.medName,
            medStrength: med.medStrength,
            medUnit: med.medUnit,
            medClass: med.medClass,
            medUnitsUsed: medUnitsUsed,
            medEndingInventory: newInventory,
            medUsedDate: medUsedDate,
        });

        // Save the new Usage entry
        const savedUsage = await newUsage.save();

        // Check if the inventory is below the threshold and include a warning in the response
        if (newInventory < med.medThreshold) {
            return res.status(200).json({
                warning: "Medication inventory below threshold. Refill required.",
                success: `Medication usage for ${med.medName} logged successfully.`,
            });
        }

        // Continue with the rest of the logic for a successful log...
        return res.status(201).json({
            success: `Medication usage for ${med.medName} ${med.medStrength} logged successfully.`,
        });
    } catch (err) {
        console.error("Error logging med usage:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/************************************************************************************
 * Function to update med usage by medId and usageDate in the database
 ***********************************************************************************/
medUsageController.updateMedUsage = async function (req, res) {
    try {
        const { medId, medUsedDate } = req.params;
        const { medUnitsUsed } = req.body;

        // Validate that medId is a valid ObjectId
        if (!medId) {
            return res.status(400).json({ error: "Invalid med ID." });
        }

        // Validate that usageDate is a valid Date
        if (!medUsedDate) {
            return res.status(400).json({ error: "Usage date is required using date format YYYY-MM-DD" });
        }

        // Find the medUsage entry
        const medUsage = await Usage.findOne({ medId: medId, medUsedDate: medUsedDate });

        if (!medUsage) {
            return res.status(404).json({ error: "Medication usage not found." });
        }

        // Calculate the difference in medUnitsUsed
        const unitsUsedDifference = medUnitsUsed - medUsage.medUnitsUsed;

        // Calculate the new inventory after usage
        const newInventory = medUsage.medEndingInventory + unitsUsedDifference;

        // Update the inventory in the medList collection
        await Med.findByIdAndUpdate(medId, { medInventory: newInventory });

        // Update the medUsage entry
        const updatedMedUsage = await Usage.findOneAndUpdate(
            { medId: medId, medUsedDate: medUsedDate },
            { medUnitsUsed, medEndingInventory: newInventory },
            { new: true }
        );

        // Check if the inventory is below the threshold and include a warning in the response
        if (newInventory < updatedMedUsage.medThreshold) {
            return res.status(200).json({
                warning: "Medication inventory below threshold. Refill required.",
                success: `Medication usage for ${updatedMedUsage.medName} updated successfully.`,
            });
        }

        // Continue with the rest of the logic for a successful update...
        return res.status(201).json({
            success: `Medication usage for ${updatedMedUsage.medName} ${updatedMedUsage.medStrength} updated successfully.`,
        });
    } catch (err) {
        console.error("Error updating med usage:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

/************************************************************************************
 * Function to delete med usage by medId and usageDate in the database
 ***********************************************************************************/
medUsageController.deleteMedUsage = async function (req, res) {
    try {
        const { medId, usageDate } = req.params;

        // Validate that medId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(medId)) {
            return res.status(400).json({ error: "Invalid med ID." });
        }

        // Validate that usageDate is a valid Date
        if (!usageDate) {
            return res.status(400).json({ error: "Usage date is required using date format YYYY-MM-DD" });
        }

        // Fetch the medication information from the medList collection
        const med = await Med.findById(medId);

        if (!med) {
            return res.status(404).json({ error: "Medication not found in medList collection." });
        }

        // Delete the medUsage entry
        const deletedMedUsage = await Usage.findOneAndDelete(
            { medId: medId, medUsedDate: usageDate }
        );

        if (!deletedMedUsage) {
            return res.status(404).json({ error: "Medication usage not found." });
        }

        // Calculate the new inventory after deleting the usage entry
        const newInventory = med.medInventory + deletedMedUsage.medUnitsUsed;

        // Update the inventory in the medList collection
        await Med.findByIdAndUpdate(medId, { medInventory: newInventory });

        // Check if the inventory is below the threshold and include a warning in the response
        if (newInventory < med.medThreshold) {
            return res.status(200).json({
                warning: "Medication inventory below threshold. Refill required.",
                success: `Medication usage for ${med.medName} deleted successfully.`,
            });
        }

        // Continue with the rest of the logic for a successful deletion...
        return res.status(201).json({
            success: `Medication usage for ${med.medName} ${med.medStrength} deleted successfully.`,
        });
    } catch (err) {
        console.error("Error deleting med usage:", err);
        res.status(500).json({ error: "Internal Server Error." });
    }
};

module.exports = medUsageController;
