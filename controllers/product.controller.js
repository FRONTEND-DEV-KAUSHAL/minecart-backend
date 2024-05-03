const Product = require('../models/product.model')



const addProduct = async(req, res) => {
    try {
        const {name, description, price, type} = req.body;
            if(!name || !description || !price || !type){
                res.status(400).send({message: "Name, Description, type or price is missing", success: false})
                return
            }

        const newProduct = await Product.create(req.body)

        if(!newProduct){
            res.status(500).send({message: "something went wrong", success: false})
            return
        }

        res.status(200).send({message: "Product added successfully", success: true})
    } catch (e) {
        console.log("Add product error", e)
        res.status(500).send({message: "Internal Server Error", error: e, success: false})

    }
}

const getAllProducts = async(req, res) => {
    try{
        const allProducts = await Product.find().lean().exec()

        res.status(200).send({message: "get all Product success", success: true, data: allProducts})
    }  catch (e) {
        console.log("get all products error", e)
        res.status(500).send({message: "Internal Server Error", error: e, success: false})

    }
}

const getSingleProduct = async(req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).lean().exec()

        if(!product){
            res.status(404).send({message: "No product found.", success: false})
            return
        }

        res.status(200).send({message: "Get product success", success: true, data: product})
    }  catch (e) {
        console.log("get product error", e)
        res.status(500).send({message: "Internal Server Error", error: e.message, success: false})

    }
}

const updateProduct = async(req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).lean().exec()

        if(!product){
            res.status(404).send({message: "Not product found", success: false})
            return
        }
        
        const updateProduct = await Product.findByIdAndUpdate(productId, req.body)

        if(!updateProduct){
            res.status(500).send({message: "Internal server error", success: false})
            return
        }

        res.status(200).send({message: "Update product success", success: true})
    } catch (e) {
        console.log("update product error", e)
        res.status(500).send({message: "Internal Server Error", error: e.message, success: false})
    }
}

const deleteProduct = async(req, res) => {
    try{
        const productId= req.params.id;
        const product = await Product.findById(productId).lean().exec()

        if(!product){
            res.status(404).send({message: "product not found", success: false})
            return
        }

        const deleteProduct = await Product.findByIdAndDelete(productId)

        if(!deleteProduct){
            res.status(500).send({message: "Internal server error", success: false})
            return
        }

        res.status(200).send({message: "Delete product success", success: true})
    }catch (e) {
        console.log("delete product error", e)
        res.status(500).send({message: "Internal Server Error", error: e.message, success: false})

    } 
}


module.exports = { addProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct }

