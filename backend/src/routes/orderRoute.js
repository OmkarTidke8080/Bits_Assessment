import express from "express";
import { order } from "../controllers/order.js";
import { getAllOrders, totalRevenue, getSingleOrderSummary } from "../controllers/order.js";
import validationResult from "../controllers/validators/validateOrderDetails.js";
const router = express.Router();


// create order  (http://localhost:3000/api/order)
router.post("/", validationResult, order);

// get ALl orders (http://localhost:3000/api/order/getAllOrders)
router.get("/getAllOrders", getAllOrders);


// get Signle Order (http://localhost:3000/api/order/getSingleOrder/3)
router.get("/getSingleOrder/:order_id", getSingleOrderSummary);

// get total revenue (http://localhost:3000/api/order/getRevenue)
router.get("/getRevenue", totalRevenue);

export default router;
