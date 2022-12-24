const mongoose = require("mongoose")

mongoose.connect('mongodb://0.0.0.0:49153/crm_database', { useNewUrlParser: true, useUnifiedTopology: true });

const clientActionSchema = new mongoose.Schema({
    contents: {type:String, require:true},
    actionType: {type:String, require:true},
    date: {type: Date, require:true},
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    },
},{timestamps: true}); 

module.exports = mongoose.model("ClientAction", clientActionSchema)