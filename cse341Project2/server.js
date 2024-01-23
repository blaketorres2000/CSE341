/******************************************
 * Requere Statements
 *****************************************/
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoDB = require("./db/mongodb.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");

const apiKey = process.env.apiKey;

// Use cors middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, z-key, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Middleware to parse JSON requests
app.use('/api-docs', (req, res, next) => {
  const apiKeyFromHeader = "3db70934-345e-409f-96cb-070e94950ffa";

  // Check if API key is present and valid
  if (apiKeyFromHeader && apiKeyFromHeader === apiKey) {
    req.query.apiKey = apiKeyFromHeader;
    next(); // Proceed to the next middleware
  } else {
    console.log("Unauthorized. Invalid API Key.");
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Middleware to serve Swagger UI
app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
  // Pass the apiKey from the query string to the Swagger UI
  req.query.apiKey = req.headers["z-key"];
  swaggerUi.setup(swaggerDocument)(req, res, next);
});

app.use(bodyParser.json());

/******************************************
 * Routes
 *****************************************/
app.use("/", require("./routes"));

/******************************************
 * Server Setup
 ******************************************/
const PORT = process.env.PORT || 5600;

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
