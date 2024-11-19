import express from "express"
import dotenv from "dotenv"
dotenv.config()
import path from "path"
import cookieParser from "cookie-parser"
import database from "./config/dbconfig.js"
import auth from "../server/routes/auth.js"
import products from "../server/routes/productRoutes.js"
import owner from "../server/routes/owner.js"
import cors from "cors"

const PORT = process.env.PORT || 8000

database()

const app = express()



app.use(cors({
    origin: "http://localhost:5000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

app.use(cookieParser())

app.use(express.json())
app.use(express.static(path.join(path.resolve(), "public")))
app.use(express.urlencoded({ extended: false }))

app.use("/api/auth", auth)
app.use("/api/products", products)
app.use("/api/owner", owner)

app.listen(PORT,
    console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)