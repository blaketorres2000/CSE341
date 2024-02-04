const express = require("express");
const router = express.Router();
const medRoutes = require("./medRoutes");
const passport = require("passport");
const {
  handleValidationErrors,
} = require("../middleware/validationMiddleware");
const { isAuthenticated } = require("../middleware/authenticate");
const { User } = require("../models");
const wholesalerRoutes = require("./wholesalerRoutes");
const usageRoutes = require("./usageRoutes");

// Login with GitHub
router.get("/login", passport.authenticate("github"), (req, res) => {});

// Logout
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Route to serve home message
router.get("/", async (req, res) => {
    try {
      if (req.session.user !== undefined) {
        // If user is logged in, retrieve user details from the database
        const userFromDB = await User.findOne({ githubUserId: req.session.user.id });
  
        if (userFromDB) {
          // Use display name from the database if available
          res.send(`Logged in as ${userFromDB.displayName}`);
        } else {
          // Use GitHub display name if not available in the database
          res.send(`Logged in as ${req.session.user.displayName}`);
        }
      } else {
        // User is not logged in
        res.send("Logged out");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  });

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

// Route to allow med routes to be served from /meds
router.use("/meds", medRoutes);

// Route to allow wholesaler routes to be served from /wholesalers
router.use("/wholesalers", wholesalerRoutes);

// Route to serve user profile
router.use("/profile", isAuthenticated, require("./profileRoutes"));

// Route to serve med usage
router.use("/usage", usageRoutes);

module.exports = router;
