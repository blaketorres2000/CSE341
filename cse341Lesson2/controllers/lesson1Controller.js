/*****************************
 * Container for all lesson1
 ****************************/
const lesson1Controller = {};

/*****************************
 * Controller Methods
 *****************************/
lesson1Controller.lesson1Main = (req, res) => {
    res.send('Blake Torres');
}

lesson1Controller.lesson1Second = (req, res) => {
    res.send('Kimberly Torres');
}

lesson1Controller.lesson1Third = (req, res) => {
    res.send('Rhonda Torres');
}

lesson1Controller.lesson1Fourth = (req, res) => {
    res.send('Stella Torres');
}

module.exports = lesson1Controller;