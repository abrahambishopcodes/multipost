import express, {Request, Response, NextFunction} from "express"
import AppError from "./utils/AppError"
import AppRouter from "./router/index.router"
import mongoose from "mongoose"
import { getEnv } from "./utils/env"

const app = express()
const PORT = getEnv("PORT", "3000")

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use("/api/v1", AppRouter)

const MONGODB_URI = getEnv("NODE_ENV", "development") === "development" ? getEnv("MONGO_DEV_URI") : getEnv("MONGO_PROD_URI");

// connect to database then start server
mongoose.connect(MONGODB_URI).then(
    () => {
        console.log("Database connected successfully")
        // start server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }
).catch((err) => {
    console.log(err)
})

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(statusCode).json({
        message,
        status: err.status,
        isOperational: err.isOperational,
    })
})