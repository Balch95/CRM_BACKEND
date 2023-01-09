const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:49153/crm_database', { useNewUrlParser: true, useUnifiedTopology: true });

const schemaClient = new mongoose.Schema({
    name: { type: String, require: true },
    companyName: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        number: { type: String, required: true },
        zipCode: { type: String, required: true },
        city: { type: String, required: true },
    },
    phone: { type: String, require: true },
    email: { type: String, require: true },
    nip: { type: Number, required: true },
    action: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClientAction"
    }]
}, { timestamps: true });

module.exports = mongoose.model('Client', schemaClient)
