const express = require("express");
const {
  addProduct,
  getProductList,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  sortProduct,
  searchProduct,
} = require("../controller/user-controller");
const validator = require("../middleware/validation");

const { productSchema } = require("../validator/validate");

const router = express.Router();

router.get("/product/:productId", getSingleProduct); // ? Get Single product
router.post("/product", validator(productSchema), addProduct); // ? add product
router.get("/product", getProductList); // ? show  productlist
router.put("/product/:productId", validator(productSchema), updateProduct); // ? Update product data in edit page
router.delete("/product/:productId", deleteProduct); // ? Delete Product
router.get("/product/search/:searchKey", searchProduct); // ? search product
router.get("/product/sort/:name", sortProduct); // ? sort product by name
module.exports = router;
