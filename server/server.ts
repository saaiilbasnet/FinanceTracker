import {config} from 'dotenv'
config()
import app from './src/app'

//importing connection.ts
import './database/connection'

console.log("Starting server...")

const startServer = ()=>{
    const port = process.env.SERVER_PORT;
    app.listen(port, ()=>{
        console.log(`Server started at port ${port}`);
        
    })
}
startServer();