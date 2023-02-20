import express from "express";
import deleteOrder from "../controlers/order.controller/deleteOrder.js";
import getOrder from "../controlers/order.controller/getOrder.js";
import getOrders from "../controlers/order.controller/getOrders.js";
import createOrder from "../controlers/order.controller/order.js";
import updateCommand from "../controlers/order.controller/updateOrder.js";

const orderRoutes = express.Router();

orderRoutes.post('/create', createOrder);
orderRoutes.get('/show', getOrders);
orderRoutes.get('/:orderId/show', getOrder);
orderRoutes.patch('/:orderId/update', updateCommand);
orderRoutes.delete('/:orderId/delete', deleteOrder);

export default orderRoutes;
