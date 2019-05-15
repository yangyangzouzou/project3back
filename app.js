require("dotenv").config();
require("./config/db_connections");
require('./config/passport');

const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const app = express();


app.use(
  session({
    cookie: { maxAge: 1800000 },
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET
  })
);

app.use(passport.initialize());
app.use(passport.session());


const corsOptions = {
  credentials: true,
  origin: process.env.REACT_DOMAIN
}

app.use(cors(corsOptions));

app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("server running, oki");
})

const apiProduct = require("./api/product");
app.use("/api/product", apiProduct);
// const apiUser = require("./api/user")
const auth = require("./routes/auth-routes");
app.use(auth);

app.use(function handle404(req, res) {
  res.status(404).send("page_not_found");
});


const listener = app.listen(process.env.PORT, () => {
  console.log(`app started @ http://localhost:${listener.address().port}`);
});


// ready to deploy