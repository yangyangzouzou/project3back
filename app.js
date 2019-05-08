require("dotenv").config();
require("./config/db_connections");
require('./config/passport');

const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const session       = require('express-session');
const passport      = require('passport');
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
  origin:  process.env.REACT_DOMAIN
}

app.use(cors(corsOptions));




app.use(bodyParser.json());

const apiProduct = require("./api/product")
const apiUser = require("./api/user")
const auth = require ("./routes/auto-routes")



app.get("/", (req, res) => { // root of the backend
    res.send("hello yang")
})

app.post("/api/user/signup", (req, res) => {
  res.send("hello new user");
});



app.use("/api/product", apiProduct);
app.use("/api/user", apiUser);
app.use("/auth", auth);



app.use(function handle404(req, res) {
  res.status(404).render("page_not_found");
});


const listener = app.listen(process.env.PORT, () => {
  console.log(`app started @ http://localhost:${listener.address().port}`);
});
