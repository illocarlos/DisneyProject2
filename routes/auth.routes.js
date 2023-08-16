const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const cloudinary = require('../middlewares/cloudinary.middleware')

const saltRounds = 10


router.get('/create', (req, res, next) => {
    res.render('auth/create')
})


router.post('/create', cloudinary.single('image'), (req, res, next) => {

    const { username, email, birthday, gender, password } = req.body

    const { path: image } = req.file


    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ username, email, birthday, gender, password: hash, image }))
        .then(res.redirect('/'))
        .catch(err => next(err))

})


router.get('/login', (req, res, next) => {
    res.render('auth/login')
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body

    if (email.length === 0 || password.length === 0) {
        res.render('auth/login')
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.render('auth/login')
                return
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                res.render('auth/login')
                return
            }

            req.session.currentUser = foundUser
            console.log(req.session.currentUser)
            res.redirect('/')
        })
        .catch(err => next(err))
})

router.get('/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})




module.exports = router