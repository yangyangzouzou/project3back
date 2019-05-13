const express = require("express");
const router = new express.Router();
const productModel = require("./../models/product");
const multerParser = require( "./../config/fileupload");

router.post("/", multerParser.single("image"), (req, res) => { // root of the backend
    // here get the value posted from the front and insert it in database
    const { productBrand, serialNumber, manufacturerInfo, price, category, rating,type,comment, isFrontPage } = req.body;

    // return console.log(req.file);

    const product = {
        productBrand,
        serialNumber,
        manufacturerInfo,
        price,
        category,
        rating,
        type,
        comment,
        isFrontPage,
        image: req.file ? req.file.secure_url : ""
    }

    // return console.log(product);

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

//edit
router.get("/:id", (req, res) => {
    productModel
      .findById(req.params.id).populate("category")
      .then(product => res.status(200).json(product))
      .catch(dbErr => res.status(500).json(dbErr));
  });


router.delete("/:id", (req, res) => {
    productModel
      .findOneAndDelete({ _id: req.params.id })
      .then(dbRes => res.status(200).json(dbRes))
      .catch(dbErr => {
        console.log(dbErr);
        res.status(500).json(dbErr);
      });
  });
  
  module.exports = router;




module.exports = router;