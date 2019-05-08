const express = require("express");
const router = new express.Router();
const productModel = require("./../models/product");


router.get("/all", (req, res) => { // root of the backend
    // here fetch all products in database
    res.json([{productBrand: "BB cream"}, {serialNumber: "n324"}, {manufactureInfo: "France"}, {price: 32}])
})


router.post("/one", (req, res) => { // root of the backend
    // here get the value posted from the front and insert it in database

})




module.exports = router;