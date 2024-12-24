import express from "express";
import orderRoute from "../src/routes/orderRoute.js";

const port = 3000;

const app = express();
app.use(express.json());
app.use("/api/order", orderRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
