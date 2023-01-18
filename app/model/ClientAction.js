const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://lwapp:lwapp@cluster0.0jckmmw.mongodb.net/crm_app', { useNewUrlParser: true, useUnifiedTopology: true });

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