import express from 'express';
import userController from '../controller/user-controller';

import validator from '../middleware/validation';

import schema from '../validator/validate';
const { productSchema } = schema;
const {
  addProduct,
  getProductList,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  sortProduct,
  searchProduct,
} = userController;

const router = express.Router();

router.get('/product/:productId', getSingleProduct); // ? Get Single product
router.post('/product', validator(productSchema), addProduct); // ? add product
router.get('/product', getProductList); // ? show  productlist
router.put('/product/:productId', validator(productSchema), updateProduct); // ? Update product data in edit page
router.delete('/product/:productId', deleteProduct); // ? Delete Product
router.get('/product/search/:searchKey', searchProduct); // ? search product
router.get('/product/sort/:name', sortProduct); // ? sort product by name

export default router;
