
import express from "express"
import { createProduct, createOwner,deleteProduct } from "../controllers/owner.js"

const router = express.Router()

if (process.env.NODE_ENV === "development") {
    router.post("/", createOwner)
}
router.post('/', createProduct)
router.delete('/:id',deleteProduct)

export default router

