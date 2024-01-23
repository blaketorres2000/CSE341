const mongoose = require("mongoose");

/******************************************
 * Connection Model and Schema
 ******************************************/
const medSchema = new mongoose.Schema({
  medId: { type: Number, required: true },
  medName: { type: String, required: true },
  medStrength: { type: String, required: true },
  medUnit: { type: String, required: true, unique: true },
  medClass: { type: String, required: true },
  medInventory: { type: Number, required: true },
  medThreshold: { type: Number, required: true },
}, { collection: 'medList' });

const Med = mongoose.model("Med", medSchema);

const usageSchema = new mongoose.Schema({
  medId: { type: Number, required: true },
  medName: { type: String, required: true },
  medStrength: { type: String, required: true },
  medUnit: { type: String, required: true, unique: true },
  medClass: { type: String, required: true },
  medUnitsUsed: { type: Number, required: true },
  medEndingInventory: { type: Number, required: true },
  medUsedDate: { type: Date, required: true },
}, { collection: 'medUsage' });

const Usage = mongoose.model("Usage", usageSchema);

module.exports = { Med, Usage };
