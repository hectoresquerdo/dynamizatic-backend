const express = require("express");
const connection = require("./config/database");
var cors = require("cors");

// Controllers imports
const orderController = require("./controllers/orderController");

// Create backend
const app = express();

// Connection verification
connection();

// Get JSON data
app.use(express.json({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 3001;

// Order Routes
app.get("/orders", orderController.getOrders);
app.post("/orders", orderController.createOrder);
app.put("/orders/:id", orderController.updateOrder);
app.delete("/orders/:id", orderController.deleteOrder);

// Running app
app.listen(PORT, () => {
  console.log(`Running backend on port:  ${PORT}`);
});
