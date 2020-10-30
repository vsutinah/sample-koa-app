const mongoose = require('mongoose');

// Schema Setup
const personSchema = new mongoose.Schema({
    first_name: String,
    last_name: String
});

module.exports = mongoose.model('Person', personSchema);

