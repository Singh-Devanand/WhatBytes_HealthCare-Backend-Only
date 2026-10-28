const mongoose = require('mongoose');

try {
    require('dns').setServers(['8.8.8.8', '1.1.1.1']);
} catch(e) {}

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDB;

