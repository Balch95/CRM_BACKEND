const Client = require('../model/Clients');

function clientList(cb) {
    Client.find().lean().exec(function (err, client) {
        if (err) {
            cb(err);
        } else {
            cb(null, client);
        }
    });
};

function clientById(id, cb){
    Client.findById(id).populate("action").exec(function(err, client){
        if(err){
            cb(err)
        } else {
            cb(null, client)
        }
    })
}

function addClient(data, cb) {
    let newClient = new Client(data);
    newClient.save(function (err, client) {
        if (err) {
            cb(err);
        } else {
            cb(null, client)
        }
    });
};

function removeClient(id, cb){
    Client.deleteOne({_id: id}, function(err, client){
        if(err){
            cb(err);
        } else {
            cb(null, client)
        }
    });
};

function updateClient(id, data, cb){
    Client.updateOne({_id: id}, data, function(err, client){
        if(err){
            cb(err);
        } else{
            cb(null, client);
        }
    })
}

module.exports = {
    list: clientList,
    single: clientById,
    add: addClient,
    remove: removeClient,
    update: updateClient
}