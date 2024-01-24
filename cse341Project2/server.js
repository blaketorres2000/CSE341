/******************************************
 * Require Statements
 *****************************************/
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoDB = require("./db/mongo.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
const routes = require("./routes");
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware');

// Use cors middleware
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, z-key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve Swagger UI
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

// Middleware to validate API key
app.use(apiKeyMiddleware);

/******************************************
 * Routes
 *****************************************/
app.use("/", routes);

/******************************************
 * Server Setup
 ******************************************/
const PORT = process.env.PORT || 5600;

// Use the Mongoose connection from mongo.js
mongoDB.connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting the application:", err);
  });
