const express = require("express");
const router = new express.Router();
const productModel = require("./../models/product");
const multerParser = require("./../config/fileupload");

router.post("/", multerParser.single("image"), (req, res) => {
  const { productBrand, serialNumber, manufacturerInfo, price, category, rating, type, comment, isFrontPage } = req.body;



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



  productModel.create(product)
    .then(dbSuccess => res.status(200).json(dbSuccess))
    .catch(err => res.status(500).json(err))
})

router.get("/all", (req, res) => {
  productModel.find()
    .then(products => {
      console.log(products);
      res.json(products)
    })

})

//edit
router.get("/:id", (req, res) => {
  productModel
    .findById(req.params.id)
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


router.post("/edit/:id", (req, res) => {
  productModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(dbRes => console.log("ITEM CHANGES", dbRes))
    .catch(dbErr => {
      res.status(200).json(dbRes);
      res.status(500).json(dbErr);
    });
});

module.exports = router;


//test


