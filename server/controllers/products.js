import Product from "../models/products.js"
import Cart from "../models/cart.js"

export const createProduct = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body
        const product = await Product.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        })
        res.status(201).json(product)
    } catch (e) {
        res.status(404).json({
            message: "Invalid data"
        })
    }

}

export const allProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({
            message: "No product found"
        })
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error.message)

    }
}

export const mycart = async (req, res) => {
    try {
        const { userId } = req.params

        if (!userId) {
            res.status(404).json({ message: "user name is mandatory" })
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image name price"
        })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found!",
            });
        }

        const validItems = cart.items.filter(
            (productItem) => productItem.productId
        );

        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const populateCartItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems,
            },
        });


    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                message: "Product not found"
            })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(400).json({
                message: "product not found"
            })
        }

        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }

        const findCurrentProductIndex = cart.items.findIndex((item) => item.productId.toString() === productId)

        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity })
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }

        await cart.save()

        res.status(200).json(cart)



    } catch (error) {
        res.status(404).json({
            message: "Interal server error"
        })
    }
}

export const removeFromCart = async (req, res) => {
    try {

        const { userId, productId } = req.params

        if (!userId || !productId) {
            res.status(404).json({
                message: "Invalid data provided"
            })
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: "items.productId",
            select: "image name price discount"
        })

        if (!cart) {
            res.status(404).json({
                message: "cart not found"
            })
        }

        cart.items = cart.items.filter((item) => item.productId._id.toString() !== productId)
        await cart.save()

        await cart.populate({
            path: "items.productId",
            select: "image name price discount"
        })

        const populateCartItems = cart.items.map((item) => ({

            productId: item.productId ? item.productId : null,
            image: item.productId ? item.productId.image : null,
            image: item.productId ? item.productId.name : "Product not found",
            price: item.productId ? item.productId.price : null,
            discount: item.productId ? item.productId.discount : null,

        }))

        res.status(200).json({
            ...cart._doc,
            populateCartItems
        })


    } catch (error) {
        res.status(500).json({
            message: "Internal server  error"
        })
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        if (!deleteProduct) {
            res.status(404).json({
                message: "Product not found"
            })
        }
        res.status(200).json({
            message: "Product deleted successfully"
        })

    } catch (error) {
        res.status(500).status({
            message: "Internal server error"
        })
    }
}


export const searchProduct = async (req, res) => {
    try {
        if (!req.query.query) {
            return res.status(400).json({ message: "Search query is required" });
        }
        const res = await Product.find({ name: new RegExp(req.query.query, 'i') })
        res.status(200).json(res)

    } catch (error) {
        res.status(500).status({
            message: "Internal server error"
        })

    }
}







