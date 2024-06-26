const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   description: {
    type: String,
    required: false
   },
   price: {
    type: String,
    required: true
   },
   type: {
    type: String,
    required: true
   }
})

module.exports = mongoose.model('product', productSchema)