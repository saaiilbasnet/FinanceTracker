import express from 'express'
import authRoute from './routes/authRoute'
import incomeRoute from './routes/incomeRoute';
import expenseRoute from './routes/expenseRoute';
import userRoutes from "./routes/userRoutes";
import reportRoute from './routes/reportRoute'
import cors from 'cors'
const app = express()

// cors config

app.use(cors({
    origin : "http://localhost:5173"
}))

app.use(express.json())

app.use('/api/auth', authRoute);
app.use('/api/income',incomeRoute);
app.use('/api/expense',expenseRoute);
app.use("/api/user", userRoutes);
app.use('/api/reports', reportRoute);



// To test the route
app.get("/test", (req, res) => {
  res.json({ message: "Auth route works" });
});

export default app
