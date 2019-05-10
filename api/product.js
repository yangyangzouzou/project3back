const express = require("express");
const router = new express.Router();
const productModel = require("./../models/product");
const multerParser = require( "./../config/fileupload");

router.post("/", multerParser.single("image"), (req, res) => { // root of the backend
    // here get the value posted from the front and insert it in database
    const { productBrand, serialNumber, manufacturerInfo, price, category, type, isFrontPage } = req.body;

    // return console.log(req.file);

    const product = {
        productBrand,
        serialNumber,
        manufacturerInfo,
        price,
        category,
        type,
        isFrontPage,
        image: req.file.secure_url
    }

    return console.log(product);

    productModel.create(product)
        .then(dbSuccess => res.status(200).json(dbSuccess))
        .catch(err => res.status(500).json(err))
})

router.get("/all", (req, res) => { // root of the backend
    // here fetch all products in database
    productModel.find()
        .then(products => {
            console.log(products);
            res.json(products)
        })
    // res.json([{productBrand: "BB cream"}, {serialNumber: "n324"}, {manufactureInfo: "France"}, {price: 32}])
})






module.exports = router;