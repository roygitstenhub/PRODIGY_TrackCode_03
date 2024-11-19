import express from  "express"
import { createProduct,allProducts, addToCart, getProduct, deleteProduct, removeFromCart, mycart, searchProduct } from "../controllers/products.js"
const router= express.Router()
import upload from "../config/multer-config.js"

// upload.single('image')
router.post('/',upload.single('image'),createProduct)
router.get('/all/products',allProducts)
router.get('/:id',getProduct)
router.get('/cart/:userId',mycart)
router.post('/cart/add/',addToCart)
router.delete('/cart/remove/:userId/:productId',removeFromCart)
router.delete('/:id',deleteProduct)
router.get('/search/:query',searchProduct)

export default router 