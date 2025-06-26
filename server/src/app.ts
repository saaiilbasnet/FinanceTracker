import express from 'express'
const app = express()
app.use(express.json())

//route imports
import userRoute from './routes/authRoute'

// user route
app.use("/api",userRoute);

export default app