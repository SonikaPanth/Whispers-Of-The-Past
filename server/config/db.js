const mongoose=require('mongoose');

const ConnectDB= async()=>{
  try {
    const conn= await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connnected ${mongoose.connection.host}`)
  } catch (error) {
    console.log(`MongoDB error ${error}`)
  }
}

module.exports=ConnectDB;