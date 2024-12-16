const mongoose = require('mongoose')

const DBConnect = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/movie')
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        
    }
}

module.exports = DBConnect