import mongoose from "mongoose";

async function db() {
    
  mongoose.connect(`${process.env.MONGODB_URI}`)
    .catch(err=>{
        console.log("MONGODB CONNECTION ERROR" , err);
        
    })
    console.log('MONGODB CONNECTED SUCCESSFULLY');
}


export default db