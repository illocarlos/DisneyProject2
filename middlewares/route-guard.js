const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect('/')
    }
}


const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()

    } else {
        res.redirect('/')
    }
}



const checkAdminOrOwner = (req, res, next) => {

    const { id: user_id } = req.params

    const userRoles = {

        isAdmin: req.session.currentUser?.role === 'ADMIN',
        isOwner: req.session.currentUser?._id === user_id,

    }

    if (userRoles.isAdmin || userRoles.isOwner) {

        next()

    } else {

        res.redirect('/?err= register plis')

    }

}

module.exports = {
    isLoggedIn,
    isLoggedOut,
    checkAdminOrOwner,

}