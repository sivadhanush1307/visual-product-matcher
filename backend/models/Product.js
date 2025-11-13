const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  imageUrl: String,
  hash: { type: String, required: true } // 64-bit hex string
});

module.exports = mongoose.model('Product', ProductSchema);
