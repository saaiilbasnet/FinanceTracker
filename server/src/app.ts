import express from 'express'
import authRoute from './routes/authRoute'
import incomeRoute from './routes/incomeRoute';
import expenseRoute from './routes/expenseRoute';
import userRoutes from "./routes/userRoutes";

import cors from 'cors'
const app = express()

// cors config

app.use(cors({
    origin : "http://localhost:5173"
}))

app.use(express.json())

app.use('/api', authRoute);
app.use('/api',incomeRoute);
app.use('/api',expenseRoute);
app.use("/api/user", userRoutes);



// To test the route
app.get("/test", (req, res) => {
  res.json({ message: "Auth route works" });
});

export default app
