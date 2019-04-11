import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import passport from "passport";

import users from "./routes/api/users";
import profile from "./routes/api/profile";
import posts from "./routes/api/posts";
import passportConfig from "./config/passport";

const path = require("path");
const mongoUri = require("./config/keys").mongoUri;

// Create Express server
const app = express();

// Connect to MongoDB
mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "authorization, X-Requested-With, content-type"
  );

  // Pass to next layer of middleware
  next();
});

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());

// Passport Config
passportConfig(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/app/client/dist/index.html"));
  });
}

export default app;
