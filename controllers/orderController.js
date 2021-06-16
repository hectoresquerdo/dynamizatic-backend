const Order = require("../models/Order");

// Get all the orders
exports.getOrders = async (req, res) => {
  let companyName = req.query.companyName;
  let status = req.query.status;
  let data;

  try {
    if (companyName && status) {
      data = await Order.find({ company_name: companyName, status: status })
        .sort({ ship_date: -1 })
        .exec();
      res.send(data);
    }

    if (status) {
      data = await Order.find({ status: status })
        .sort({ ship_date: -1 })
        .exec();
      res.send(data);
    }
    if (companyName) {
      data = await Order.find({ company_name: companyName })
        .sort({ ship_date: -1 })
        .exec();
      res.send(data);
    }
    if (!companyName && !status) {
      data = await Order.find().sort({ ship_date: -1 });
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("There are an error!");
  }
};
// Create and save the order
exports.createOrder = async (req, res) => {
  try {
    let order = new Order(req.body);
    await order.save();

    res.send("Order created successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Something was wrong!");
  }
};
// Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const { order_id, country, ship_date, company_name, status, type } =
      req.body;
    const newOrder = {};

    if (order_id) {
      newOrder.order_id = order_id;
      newOrder.country = country;
      newOrder.ship_date = ship_date;
      newOrder.company_name = company_name;
      newOrder.status = status;
      newOrder.type = type;
    }

    // Check if exists the order
    let order = await Order.findOne({ order_id: req.params.id });

    if (order.order_id !== order_id) {
      return res.status(404).json({ msg: "Order not found." });
    }
    order = await Order.findOneAndUpdate(
      { order_id: req.params.id },
      { $set: newOrder },
      { new: true }
    );
    res.json({ order });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "Order not found." });
  }
};
// Delete the order by ID
exports.deleteOrder = async (req, res) => {
  try {
    let order = await Order.findOne({ order_id: req.params.id });
    // Check if exists the order
    if (order.order_id !== req.params.id) {
      return res.status(404).json({ msg: "Order not found." });
    } else {
      await Order.findOneAndDelete({ order_id: req.params.id });
      res.json({ msg: "Order deleted successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something was wrong!");
  }
};
