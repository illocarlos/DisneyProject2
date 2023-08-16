const router = require('express').Router()
const { isLoggedIn } = require('../middlewares/route-guard')
const disneyApi = require('../services/disneyApi.service')

router.get('/characters', isLoggedIn, (req, res, next) => {


    let page = req.query.page

    if (!page) page = 1

    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1

    disneyApi
        .getAllCharacters(page)
        .then(response => res.render('characters/list-characters', { characters: response.data, nextPage, prevPage }))
        .catch(err => next(err))

})

router.get('/character/:id', isLoggedIn, (req, res, next) => {
    const { id: character_id } = req.params
    b
    disneyApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/character', response.data))
        .catch(err => next(err))
})


router.get('/search', isLoggedIn, (req, res, next) => {
    res.render('characters/search-character')
})

router.post('/search', (req, res, next) => {
    const { search_query } = req.body

    disneyApi
        .searchOneCharacter(search_query)
        .then(response => res.send(response.data))
        .catch(err => next(err))
})


module.exports = router