const express = require('express')
const router = express.Router()
const Event = require("../models/event.model")
const { formatDate, formatTime } = require('../utils/date-utils')

router.get("/map", (req, res, next) => {
    res.render("maps/map")
})


router.get("/:id/mapId", (req, res, next) => {

    const { id: event_id } = req.params

    Event
        .findById(event_id)
        .populate('attendees')
        .then(event => {

            event.formattedTime = formatTime(event.date)
            event.formattedDate = formatDate(event.date)
            res.render('maps/mapId', event)
        })
        .catch(err => (console.log(err)))
})




module.exports = router
