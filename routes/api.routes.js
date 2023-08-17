const router = require('express').Router()
const Event = require("../models/event.model");

router.get('/events', (req, res, next) => {

    Event
        .find()
        .then(events => res.json(events))
        .catch(err => console.log(err))

})

router.get('/mapDetails', (req, res, next) => {

    const { id } = req.body

    Event
        .findById(event_id)
        .then(event => res.json(event))
        .catch(err => console.log(err))

})

module.exports = router