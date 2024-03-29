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
  medEndingInventory: { type: Number },
  medUsedDate: { type: Date, required: true },
}, { collection: 'medUsage' });

const Usage = mongoose.model("Usage", usageSchema);

const userSchema = new mongoose.Schema({
  githubUserId: { type: String, required: true },
  username: { type: String },
  email: { type: String },
  displayName: { type: String },
});

const User = mongoose.model("User", userSchema);

const wholesalerSchema = new mongoose.Schema({
  compName: { type: String, required: true },
  medId: { type: mongoose.Schema.Types.ObjectId, ref: 'Med', required: true },
  medCost: { type: Number, required: true },
}, { collection: 'wholesalers' });

const Wholesaler = mongoose.model("Wholesaler", wholesalerSchema);

module.exports = { Med, Usage, User, Wholesaler };

