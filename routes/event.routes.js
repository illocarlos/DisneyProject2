const router = require('express').Router()
const Event = require('../models/event.model')
const User = require('../models/User.model')
const { checkAdminOrOwner, isLoggedIn } = require('../middlewares/route-guard');


router.get('/create-event', isLoggedIn, (req, res, next) => {

    Event
        .find()
        .then(events => res.render('events/create-event', { events }))
        .catch(err => next(err))
})

router.post('/create-event', isLoggedIn, (req, res, next) => {

    const { title, description, date, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .create({ title, description, date, location, owner: req.session.currentUser._id })
        .then(() => res.redirect('/create-event'))
        .catch(err => next(err))


})

router.get('/edit-event/:id', isLoggedIn, (req, res, next) => {

    const { id: event_id } = req.params

    Event
        .findById(event_id)
        .populate('owner')
        .then(event => {

            if (event.owner._id.toString() === req.session.currentUser?._id || req.session.currentUser?.role === 'ADMIN') {
                res.render('events/edit-event', event)
            } else {
                res.redirect('/create-event')
            }
        })
        .catch(err => next(err))
})

router.post('/edit-event/:id', isLoggedIn, checkAdminOrOwner, (req, res, next) => {

    const { id: event_id } = req.params
    const { title, description, date, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .findByIdAndUpdate(event_id, { title, description, date, location })
        .then(() => res.redirect('/create-event'))
        .catch(err => next(err))
})

router.post('/delete-event/:id', isLoggedIn, checkAdminOrOwner, (req, res, next) => {

    const { id: event_id } = req.params
    console.log(event_id)
    Event

        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/create-event'))
        .catch(err => next(err))

})

router.get('/addAttendee/:id', (req, res, next) => {

    const { id: event_id } = req.params
    const { _id: user_id } = req.session.currentUser

    Event
        .findByIdAndUpdate(event_id, { $addToSet: { attendees: user_id } })
        .then(() => res.redirect(`/${event_id}/mapId`))
        .catch(err => next(err))

})

router.get('/removeAttendee/:id', (req, res, next) => {

    const { id: event_id } = req.params
    const { _id: user_id } = req.session.currentUser

    Event
        .findByIdAndUpdate(event_id, { $pull: { attendees: user_id } })
        .then(() => res.redirect(`/${event_id}/mapId`))
        .catch(err => next(err))
})


module.exports = router