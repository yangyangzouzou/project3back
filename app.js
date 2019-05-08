require("dotenv").config();
require("./config/db_connections");
require('./configs/passport')
const cors = require('cors');


const express = require("express");
const app = express();
const session       = require('express-session');
const passport      = require('passport');


app.use(session({
    secret:"some secret goes here",
    resave: true,
    saveUninitialized: true
  }));

app.use(passport.initialize());

app.use(passport.session());

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

app.get("/", (req, res) => { // root of the backend
    res.send("hello yang")
})

const productAPI = require("./api/productAPI");
app.use("/api/product", productAPI);

const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);


app.listen(process.env.PORT)


module.exports = app;