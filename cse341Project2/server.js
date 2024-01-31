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
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const session = require("express-session");
const { User } = require("./models");

// Use cors middleware
app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  // This is the basic express session({..}) initialization.
  .use(passport.initialize())
  // init passport on every route call.
  .use(passport.session())
  // allow passport to use "express-session".
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }))

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ["user", "user:email"],
    },
    async (accessToken, refreshtoken, profile, done) => {
      try {
        let email = profile.email || "email not provided";

        const existingUser = await User.findOne({ githubUserId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          githubUserId: profile.id,
          username: profile.username,
          email: email,
          displayName: profile.displayName,
        });

        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve Swagger UI
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

/******************************************
 * Routes
 *****************************************/
app.use("/", routes);

/******************************************
 * Server Setup
 ******************************************/
const PORT = process.env.PORT || 5600;

// Use the Mongoose connection from mongo.js
mongoDB
  .connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error starting the application:", err);
  });
