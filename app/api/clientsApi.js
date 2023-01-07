const express = require('express');

const router = express.Router();

const clientList = require('../controllers/clients.controller');

const authLevel1 = require('../middlewares/authLevel1')
const authLevel2 = require('../middlewares/authLevel2')


router.get('/all',authLevel1, function (req, res) {
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

router.get('/:id',authLevel1, function(req, res){
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

router.post('/add', authLevel2, function (req, res) {
    clientList.add(req.body, function (err, client) {
        if (err) {
            res.status(404);
            res.json({
                error: "Client not add"
            })
        }else if(client){
            res.json(client)
        }else{
            res.status(201);
        }
    });
});

router.delete('/remove/:id',authLevel2, function(req, res){
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

router.put('/update/:id',authLevel2, function(req,res){
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