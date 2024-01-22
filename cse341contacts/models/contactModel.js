const mongoose = require("mongoose");

/******************************************
 * Connection Model and Schema
 ******************************************/
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  favoriteColor: { type: String, required: [true, 'Favorite color is required'] },
  birthday: { type: Date, required: [true, 'Birthday is required'] },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;