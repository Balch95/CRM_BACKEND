const express = require('express');

const router = express.Router();

const clientList = require('../controllers/clients.controller');

const auth = require('../middlewares/auth')

router.get('/all', auth, function (req, res) {
    clientList.list(function (err, client) {
        if (err) {
            res.status(404);
            res.json({
                error: "Client don't exist"
            })
        } else {
            res.json(client)
        }
    });
});

router.get('/:id', function(req, res){
    clientList.single(req.params.id, function(err, client){
        if(err){
            res.status(404);
            res.json({
                error: "Client don't exist"
            });
        } else {
            res.json(client)
        }
    })
})

router.post('/add', function (req, res) {
    clientList.add(req.body, function (err, client) {
        if (err) {
            res.status(404);
            res.json({
                error: "Client not add"
            })
        } else {
            res.json(client)
        }
    });
});

router.delete('/remove/:id', function(req, res){
    clientList.remove(req.params.id, function(err, client){
        if (err) {
            res.status(404);
            res.json({
                error: "Client not remove"
            })
        } else {
            res.json("Client remove")
        }
    });
});

router.put('/update/:id', function(req,res){
    clientList.update(req.params.id, req.body, function(err, client){
        if(err){
            res.status(404);
            res.json({
                error: "Client not update"
            })
        } else {
            res.json({
                message: "Client update"
            })
        }
    })
});

module.exports = router;