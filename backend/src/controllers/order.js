import { validationResult } from "express-validator";

let orders = [];

// Create Order
export const order = (req, res) => {

  // validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { products } = req.body;

  let totalAmount = 0;
  let discount = 0;

  products.forEach((product) => {
    totalAmount += product.quantity * product.price;
  });

  // Discount Rules
  if (totalAmount > 10000) {
    discount += totalAmount * 0.1;
  }
  if (products.length > 5) {
    discount += 500;
  }

  const finalAmount = totalAmount - discount;

  // Create and Save Order
  const order = {
    id: orders.length + 1,
    products,
    totalAmount,
    discount,
    finalAmount,
  };

  orders.push(order);

  // send order summary in response
  res.status(201).json(order);
};


// get single order (search using order_id)
export const getSingleOrderSummary = (req, res) => {
  const { order_id } = req.params;

  const order = orders.find((order) => order.id == order_id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
};


// Get All Orders
export const getAllOrders = (req, res) => {
  if (orders.length > 0) {
    res.status(200).json(orders);
  } else {
    res.status(200).json({
      message: "No orders available.",
    });
  }
};

// get total revenue
export const totalRevenue = (req, res) => {
  let sum = 0;

  orders.forEach((order) => {
    order.products.forEach((product) => {
      sum += product.price * product.quantity;
    });
  });

  res.status(200).json({ totalRevenue: sum });
};
