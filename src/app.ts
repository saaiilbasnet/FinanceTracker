

import express from 'express'
import authRoute from './route/authRoute'
import incomeRoutes from './route/incomeRoute';

const app = express()

console.log("App is being initialized")

app.use(express.json())

app.use("/auth", authRoute);
app.use('/income',incomeRoutes)
// To test the route
app.get("/test", (req, res) => {
  res.json({ message: "Auth route works" });
});

export default app
