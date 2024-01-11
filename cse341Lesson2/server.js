/******************************************
 * Requere Statements
 *****************************************/
const express = require('express');
const app = express();

/******************************************
 * Routes
 *****************************************/
app.use(require('./routes/static'));
app.use('/lesson1', require('./routes/lesson1Route'));

/******************************************
 * Server Setup
******************************************/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});