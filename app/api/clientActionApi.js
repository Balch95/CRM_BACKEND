const express = require('express');

const router = express.Router();

const clientAction = require('../controllers/clientAction.controller');

router.post("/add/:clientId", function (req, res) {
    clientAction.add(req.params.clientId, req.body, function (err, data) {
        if (err) {
            res.status(404)
            res.json({
                error: "Action don't add"
            })
        } else {
            res.json({ data })
        }
    })
})


router.delete("/remove/:clientId", function (req, res) {
    clientAction.remove(req.params.clientId, req.body.clientActionId, function (err, data) {
        if (err) {
            res.status(404)
            res.json({
                error: "Action don't remove"
            })
        } else {
            res.json(data)
        }
    })
})

router.put("/update/:clientActionId", function(req, res){
    clientAction.update(req.params.clientActionId, req.body, function(err, clientAction){
        if(err){
            res.status(404);
            res.json({
                error: "Action  don't update"
            })
        } else {
            res.json({
                message: "Action update"
            })
        }
    })
})

module.exports = router;