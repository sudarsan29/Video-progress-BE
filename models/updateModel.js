const mongoose = require('mongoose');
 const intervalSchema = new mongoose.Schema({
    start: Number,
    end: Number
 });

 const updateSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true
    },
    watchedIntervals: [intervalSchema],
    updatePercent: Number
 });

 module.exports = mongoose.model('Update', updateSchema);