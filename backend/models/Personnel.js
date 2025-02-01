const mongoose = require('mongoose');

const personnelSchema = mongoose.Schema({
    name: { type: String, required: true },
    rank: { type: String, required: true },
    unit: { type: String, required: true },
    contact: { type: String, required: true },
}, { versionKey: false });

module.exports = mongoose.model('Personnel', personnelSchema);
