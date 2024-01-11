/*****************************
 * Module dependencies
 ****************************/
const express = require('express');
const router = express.Router();
const lesson1Controller = require('../controllers/lesson1Controller');

/*****************************
 * Routes
 *****************************/
router.get('/', lesson1Controller.lesson1Main);
router.get('/kimberly', lesson1Controller.lesson1Second);
router.get('/rhonda', lesson1Controller.lesson1Third);
router.get('/stella', lesson1Controller.lesson1Fourth);

module.exports = router;