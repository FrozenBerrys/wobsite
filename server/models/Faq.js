const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const FaqSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Faq', FaqSchema);

