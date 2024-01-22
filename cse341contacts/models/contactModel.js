const mongoose = require("mongoose");

/******************************************
 * Connection Model and Schema
 ******************************************/
const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    validate: {
      validator: function (value) {
        return value.trim() !== "";
      },
      message: "First name cannot be empty",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    validate: {
      validator: function (value) {
        return value.trim() !== "";
      },
      message: "Last name cannot be empty",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensures that each email is unique
    validate: {
      validator: function (value) {
        // Custom email validation using a simple regex
        return /\S+@\S+\.\S+/.test(value);
      },
      message: "Invalid email format",
    },
  },
  favoriteColor: {
    type: String,
    required: [true, "Favorite color is required"],
    validate: {
      validator: function (value) {
        return value.trim() !== "";
      },
      message: "Favorite color cannot be empty",
    },
  },
  birthday: {
    type: String,
    required: [true, "Birthday is required"],
    validate: {
      validator: function (value) {
        return value.trim() !== "";
      },
      message: "Birthday cannot be empty",
    },
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
