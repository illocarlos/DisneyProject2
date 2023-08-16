const express = require('express');
const router = express.Router();
const Event = require("../models/event.model");

router.get("/map", (req, res, next) => {

    res.render("maps/map");
});


router.get("/mapId", (req, res, next) => {

    const { id: event_id } = req.params

    //aqui conseguis el festival lo buscais en bbdd, y le pasais a la vista el objeto entero 
    Event
        .findById(event_id)
        .then(event => res.render('map/mapId', event))
        .catch(err => (console.log(err)))

    res.render("maps/mapId")
});


module.exports = router;