const express = require('express')
const { addProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')
const { authMiddleware } = require('../middlewares/auth.middleware')
const { adminMiddleware } = require('../middlewares/admin.middleware')

const productRouter = express.Router()


productRouter.post('/add',adminMiddleware, addProduct)
productRouter.get('/getAll', authMiddleware, getAllProducts)
productRouter.get('/get/:id', authMiddleware, getSingleProduct)
productRouter.post('/update/:id', adminMiddleware, updateProduct)
productRouter.delete('/delete/:id', adminMiddleware, deleteProduct)

module.exports = productRouter