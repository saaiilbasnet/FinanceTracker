import {Sequelize} from 'sequelize-typescript'

import Income from './models/incomeModel';
//object instantation
const CONNECTION_STRING = process.env.DATABASE_URL;
if(!CONNECTION_STRING){

      throw new Error('DATABASE_URL is not defined in the environment variables.');

}
  const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect : "postgres",
    models : [Income],
    dialectOptions:{
        ssl:{
            rejectUnauthorized:false,
        }
    }
});

// authentication
sequelize.authenticate()
.then(()=>{
    console.log("Successfully authenticated and connected to Supabase.");
    
})
.catch((error)=>{
    console.log(error);
    
})

// migration 
sequelize.sync({alter: false}).then(()=>{
    console.log("Migrated to Supabase!");
    
}).catch((error)=>{
    console.log(error);
    
})

export default sequelize
