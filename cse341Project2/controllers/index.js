const contactController = {};

/******************************************
 * Function to get clients from the database
 ******************************************/
contactController.homePage = function (req, res) {
  res.send("Welcome to the CSE 341 Project 2 Home Page for Blake Torres");
  res.send("To use Swagger, add /api-docs to the end of the URL");
};

module.exports = contactController;