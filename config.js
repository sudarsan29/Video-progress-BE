const mongoose = require('mongoose');

const MONGO_DB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/videoUpdate', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = MONGO_DB;