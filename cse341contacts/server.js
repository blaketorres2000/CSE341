/******************************************
 * Requere Statements
 *****************************************/
const express = require('express');
const app = express();

/******************************************
 * Routes
 *****************************************/
app.use(require('./routes/static'));

/******************************************
 * Server Setup
******************************************/
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});