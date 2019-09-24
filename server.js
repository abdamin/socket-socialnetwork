const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const activity = require("./routes/api/activity");
const confirmation = require("./routes/api/confirmation");
const passwordChange = require("./routes/api/passwordChange");

const path = require("path");

const app = express();

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require("./config/keys").mongoURI;

const API_URL = require("./config/keys").API_URL;

console.log(API_URL);

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/activity", activity);
app.use("/api/confirmation", confirmation);
app.use("/api/passwordChange", passwordChange);

//multer middleware error handler
app.use(function(err, req, res, next) {
  if (err.name === "MulterError" || err.message === "Upload an image") {
    res.status(400).json({ error: err.message });
  } else {
    next(err);
  }
});

// catch all error handling function for express middleware
app.use(function(err, req, res, next) {
  console.log(err);
  return res.status(500).json({ error: err });
});

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static/public folder
  app.use(express.static("client/build"));

  //serve that index.html file ('*' means anything aside from these api routes above)
  app.get("*", (req, res) => {
    //load the index.html file
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
