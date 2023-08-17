const router = require('express').Router()
const User = require('../models/User.model')
const { checkAdminOrOwner, isLoggedIn } = require('../middlewares/route-guard')
const { formatDate, formatTime } = require('../utils/date-utils')


router.get('/list-users', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'USER' })
        .then(users => res.render('users/list-users', { users }))
        .catch(err => next(err))
})


router.get('/details/:id', (req, res, next) => {

    const { id: user_id } = req.params

    const userRoles = {
        isAdmin: req.session.currentUser?.role === 'ADMIN',
        isThisUser: req.session.currentUser?._id === user_id
    }

    User
        .findById(user_id)
        .then(user => {
            user.formattedDate = formatDate(user.birthday)
            user.formattedTime = formatTime(user.birthday)
            res.render('users/details', { user, userRoles })
        })
        .catch(err => next(err))
})


router.get('/edit-user/:id', checkAdminOrOwner, isLoggedIn, (req, res, next) => {

    const { id: user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('users/edit-user', user))
        .catch(err => next(err))

})

router.post('/edit-user/:id', checkAdminOrOwner, (req, res, next) => {

    const { id: user_id } = req.params
    const { username, email, birthday, gender } = req.body

    User
        .findByIdAndUpdate(user_id, { username, email, birthday, gender })
        .then(() => res.redirect('/list-users'))
        .catch(err => next(err))
})

router.post('/delete-user/:id', checkAdminOrOwner, (req, res, next) => {

    const { id: user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/list-users'))
        .catch(err => next(err))

})


module.exports = router