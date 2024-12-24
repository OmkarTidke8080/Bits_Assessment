import { body, validationResult } from "express-validator";

 const validateOrderDetails = [
  body("products")
    .isArray({ min: 1 })
    .withMessage("Products must be an array with at least one item."),

  body("products.*.product_Name")
    .isString()
    .notEmpty()
    .withMessage("Product Name is required and should be a valid string.")
    .matches(/^[A-Za-z0-9\s]*$/)
    .withMessage("Product Name should only contain letters and numbers.")
    .isLength({ max: 30 })
    .withMessage("Product Name should not exceed 30 characters."),

  body("products.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be an integer greater than 0."),

  body("products.*.price")
    .isNumeric()
    .withMessage("Price must be a number greater than 0.")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0."),
];


export default validateOrderDetails