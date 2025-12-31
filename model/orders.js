const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: "AllProduct", required: true },
  title: String,
  quantity: Number,
  price: Number,
  imageUrls: [String],
  brand: String,
  color: String,
  shape: String,
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "RegisteredUser", required: true },
  userName: String,
  email: String,
  phone: String,
  address: String,
  paymentMethod: { type: String, required: true },
  orderItems: [OrderItemSchema],
  totalAmount: Number,
  orderStatus: { type: String, default: "Placed" },
  deliverydate:String,
  placedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
