const mongoose = require('mongoose');

const AllproductsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image_urls: { type: [String], required: true }, // ✅ array of multiple images
    brand: { type: String, required: true },
    total_reviews: { type: Number, required: true },
    rating: { type: Number, required: true },
    availability: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    is_prime: { type: Boolean, default: false }, // ✅ only for main product
    shape: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true }, // ✅ used for matching active color variant
    similar_products: {type:[String],required:true},
    transparentimg_url:{type:String,required:true},
    product_id:{type:String,required:true}
}, { timestamps: true });


const AllProduct = mongoose.model("AllProduct", AllproductsSchema);

module.exports = AllProduct;
