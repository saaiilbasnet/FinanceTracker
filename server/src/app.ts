import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())

//cors connection
app.use(cors({
    origin : "http://localhost:5173"
}))

//route imports
import userRoute from './routes/authRoute'

// user route
app.use("/api",userRoute);

export default app