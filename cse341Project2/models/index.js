const mongoose = require("mongoose");

/******************************************
 * Connection Model and Schema 
 ******************************************/

// schema for the medList collection
const medSchema = new mongoose.Schema({
  medName: { type: String, required: true },
  medStrength: { type: String, required: true },
  medUnit: { type: String, required: true },
  medClass: { type: String, required: true },
  medInventory: { type: Number, required: true },
  medThreshold: { type: Number, required: true },
}, { collection: 'medList' });

const Med = mongoose.model("Med", medSchema);

// schema for the medUsage collection
const usageSchema = new mongoose.Schema({
  medId: { type: String, required: true},
  medName: { type: String },
  medStrength: { type: String },
  medUnit: { type: String, },
  medClass: { type: String },
  medUnitsUsed: { type: Number, required: true },
  medEndingInventory: { type: Number, required: true },
  medUsedDate: { type: Date, required: true },
}, { collection: 'medUsage' });

const Usage = mongoose.model("Usage", usageSchema);

module.exports = { Med, Usage };
