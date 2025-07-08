import express from 'express'
import authRoute from './routes/authRoute'
import incomeRoute from './routes/incomeRoute';
import expenseRoute from './routes/expenseRoute';
import corse from 'cors'
const app = express()

console.log("App is being initialized")
app.use(corse());
app.use(express.json())

app.use("/api", authRoute);
app.use('/income', incomeRoute)
app.use('/expense', expenseRoute)

// To test the route
app.get("/test", (req, res) => {
  res.json({ message: "Auth route works" });
});

export default app
