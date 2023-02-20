import express from 'express';
import orderRoutes from './orderRoutes.js';
import productRoutes from './productRoutes.js';
import userRoutes from './userRoutes.js';

const mainRoutes = express.Router();

mainRoutes.use('/users', userRoutes);
mainRoutes.use('/products', productRoutes);
mainRoutes.use('/orders', orderRoutes);

export default mainRoutes;
