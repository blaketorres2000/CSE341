const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json("Unauthorized, you do not have access permissions.");
    }
    next();
};

module.exports = { isAuthenticated };