/******************************************
 * Requere Statements
 *****************************************/
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes.js");
const mongoDB = require("./db/mongodb.js");

// Middleware to parse JSON requests
app.use(bodyParser.json());

/******************************************
 * Routes
 *****************************************/
app.use("/", contactRoutes);

/******************************************
 * Server Setup
 ******************************************/
const PORT = process.env.PORT || 3500;

// Use the Mongoose connection from mongodb.js
mongoDB.connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting the application:", err);
  });
