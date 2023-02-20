import express from 'express';
import addProduct from '../controlers/product.controller/addProduct.js';
import deleteProduct from '../controlers/product.controller/deleteProduct.js';
import getProducts from '../controlers/product.controller/getProducts.js';
import updateProduct from '../controlers/product.controller/updateProduct.js';

const productRoutes = express.Router();

productRoutes.post('/add', addProduct);
productRoutes.get('/show', getProducts);
productRoutes.patch('/:productId/update', updateProduct);
productRoutes.delete('/:productId/delete', deleteProduct);

export default productRoutes;
