/******************************************
 * Requere Statements
 *****************************************/
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/index.js");
const mongoDB = require("./db/mongodb.js");

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

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
