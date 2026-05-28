import express, {Request, Response, NextFunction} from "express"
import AppError from "./utils/AppError"

const app = express()
const PORT = 3000

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
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