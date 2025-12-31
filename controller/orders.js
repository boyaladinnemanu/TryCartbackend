const Order = require("../model/orders");
const { find } = require("../model/registereduser");

async function createOrder(req, res) {
  try {
    const {
      userId,
      userName,
      email,
      phone,
      address,
      paymentMethod,
      orderItems,
      totalAmount,
      deliverydate,
    } = req.body;

    const fields = {
      userId: "User ID",
      userName: "User Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      paymentMethod: "Payment Method",
      orderItems: "Order Items",
      totalAmount: "Total Amount",
      deliverydate: "Delivery Date",
    };

    // Check if any field is missing
    for (let key in fields) {
      if (!req.body[key]) {
        return res.status(400).json({ message: `Please fill ${fields[key]}` });
      }
    }

    // Create a new order document
    const newOrder = new Order({
      userId,
      userName,
      email,
      phone,
      address,
      paymentMethod,
      orderItems, // array of items [{ productId, title, quantity, ... }]
      totalAmount,
      deliverydate,
      orderStatus: "Placed", // initial status
    });

    // Save the new order
    const savedOrder = await newOrder.save();

    // Respond with an immediate success message
    res.status(201).json({
      message: "Order placed successfully. Your order is being processed.",
      order: savedOrder,
    });

    // Change order status to 'Pending' after 10 minutes
    setTimeout(async () => {
      try {
        await Order.findByIdAndUpdate(savedOrder._id, { orderStatus: 'Pending' });
        console.log(`Order ${savedOrder._id} status updated to Pending`);
      } catch (error) {
        console.error(`Error updating order ${savedOrder._id} status to Pending:`, error);
      }
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    // Change order status to 'Delivered' after 20 minutes
    setTimeout(async () => {
      try {
        await Order.findByIdAndUpdate(savedOrder._id, { orderStatus: 'Delivered' });
        console.log(`Order ${savedOrder._id} status updated to Delivered`);
      } catch (error) {
        console.error(`Error updating order ${savedOrder._id} status to Delivered:`, error);
      }
    }, 20 * 60 * 1000); // 20 minutes (10 + 10 minutes)

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
}

async function handelgetordersbyid(req,res) {
    try{
        const userId = req.user.userId
        const myorders = await Order.find({userId:userId}).sort({ placedAt: -1 });
        return res.status(200).json({ myorders });
  
    } catch (err) {
      console.error("Error fetching your orders:", err.message);
      return res.status(500).json({ msg: "Server error" });
    }
}

module.exports = {createOrder,handelgetordersbyid}