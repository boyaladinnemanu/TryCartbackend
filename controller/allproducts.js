const AllProduct = require('../model/allproducts')
const RegisteredUser = require("../model/registereduser")
const mongoose = require('mongoose')

async function handelAllproducts(req,res){
    try{
        const{
            title,
            image_urls,
            brand,
            total_reviews,
            rating,
            availability,
            price,
            description,
            is_prime,
            shape,
            category,
            color,
            transparentimg_url,
            similar_products,
            product_id
        }=req.body

        const newproduct = new AllProduct({
            title,
            image_urls,
            brand,
            total_reviews,
            rating,
            availability,
            price,
            description,
            is_prime,
            shape,
            category,
            color,
            transparentimg_url,
            similar_products,
            product_id
        })

        const savedproduct = await newproduct.save()
        res.status(201).json({msg:"Product added successfully",product:savedproduct})

    }catch(err){
        return res.status(500).json({msg:"Failed to add product",Error:err.message})
    }
}

async function handelproductdelete(req,res){
    await AllProduct.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Deleted Successfully"})
}

async function handelgetproductd(req,res){
    const product = await AllProduct.findById(req.params.id)
    res.status(200).json({msg:"Get the product Successfully",product:product})
}

async function handelputproductd(req, res) {
    try {
        const product = await AllProduct.findByIdAndUpdate(
            req.params.id, // ID from the route parameter
            { $set: req.body }, // Update the fields in the body
            { new: true, runValidators: true } // Return the updated document and validate
        );

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({ msg: "Product updated successfully", product: product });
    } catch (err) {
        res.status(404).json({ msg: "Error updating product", Err: err.message });
    }
}


async function handelgetprimeproducts(req, res) {
    try {
      const userId = req.user.userId;
      const user = await RegisteredUser.findById(userId);
  
      if (!user || !user.isPrime) {
        return res.status(401).json({ msg: "Not a prime user" });
      }
  
      const allproducts = await AllProduct.find({ is_prime: true });
      return res.status(200).json({ products: allproducts });
  
    } catch (err) {
      console.error("Error fetching prime products:", err.message);
      return res.status(500).json({ msg: "Server error" });
    }
  }

async function handelgetAllproducts(req,res){
    const allproducts = await AllProduct.find({is_prime:false})
    res.json(allproducts)
}

async function handelgetAllFavproducts(req,res){
  try{
    const {Ids} = req.body
    const favproducts = await AllProduct.find({_id:{$in:Ids}})
    res.status(200).json({favproducts:favproducts})
}catch(err){
    res.status(500).json({msg:"Failed to fetch the similarproducts"})
}
}


async function handelSimilarproducts(req,res){
    try{
        const {productIds} = req.body
        console.log(productIds)
        const similarproducts = await AllProduct.find({product_id:{$in:productIds}})
        res.status(200).json({similarproducts:similarproducts})
    }catch(err){
        res.status(500).json({msg:"Failed to fetch the similarproducts"})
    }
}

async function handleQueryParams(req, res) {
    const { category, color, searchq, min_price, max_price, min_rating, sorting } = req.query;
  
    let filter = {is_prime: false,};
  
    if (category) filter.category = category;
    if (color) {
        filter.color = { $regex: new RegExp(`^${color}$`, 'i') };
      }      
  
    if (searchq) {
      filter.$or = [
        { title: { $regex: searchq, $options: "i" } },
        { description: { $regex: searchq, $options: "i" } }
      ];
    }
  
    if (min_price || max_price) {
        const priceFilter = {};
        if (min_price) priceFilter.$gte = parseFloat(min_price);
        if (max_price) priceFilter.$lte = parseFloat(max_price);
        if (Object.keys(priceFilter).length > 0) {
          filter.price = priceFilter;
        }
      }
      
  
    if (min_rating) {
      filter.rating = { $gte: parseFloat(min_rating) };
    }
    
    let query = AllProduct.find(filter);
    if (sorting) query = query.sort(sorting);
  
    const products = await query;
    res.status(200).json(products);
  }
  
  
  

module.exports={handelAllproducts,handelgetAllFavproducts,handelproductdelete,handelgetAllproducts,handelgetprimeproducts,handelgetproductd,handelputproductd,handelSimilarproducts,handleQueryParams}