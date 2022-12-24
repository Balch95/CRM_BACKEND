const Client = require('../model/Clients');
const ClientAction = require('../model/ClientAction');

function addClientAction(clientId, data, cb) {
    let newClientAction = new ClientAction({ ...data, client: clientId });
    newClientAction.save(function (err, clientAction) {
        if (err) {
            cb(err)
        } else {
            Client.findById(clientId, function (err, client) {
                if (err) {
                    cb(err)
                } else {
                    client.action.push(clientAction._id);
                    client.save();
                }
            });
            cb(null, clientAction);
        }
    })
}

function removeClientAction(clientId, clientActionId, cb) {
    Client.findById(clientId, function (err, client) {
        if (err) {
            cb(err)
        } else {
            client.action.pull(clientActionId);
            client.save();
        };
    });

    ClientAction.deleteOne({ _id: clientActionId }, function (err, data) {
        if (err) {
            cb(err)
        } else {
            cb(null, data)
        }
    })
}

module.exports = {
    add: addClientAction,
    remove: removeClientAction
}