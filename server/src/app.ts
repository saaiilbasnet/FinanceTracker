import express from 'express'
import authRoute from './routes/authRoute'
import incomeRoute from './routes/incomeRoute';
import expenseRoute from './routes/expenseRoute';
const app = express()

console.log("App is being initialized")

app.use(express.json())

app.use("/auth", authRoute);
app.use('/income',incomeRoute)
app.use('/expense',expenseRoute)



export default app
