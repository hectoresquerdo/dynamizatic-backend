const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  ship_date: {
    type: Date,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrdersSchema);
