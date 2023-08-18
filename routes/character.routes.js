const router = require('express').Router()
const { isLoggedIn } = require('../middlewares/route-guard')
const disneyApi = require('../services/disneyApi.service')

router.get('/characters', isLoggedIn, (req, res, next) => {

    let page = req.query.page || 1

    const nextPage = Number(page) + 1
    const prevPage = Number(page) - 1
    const showSearchBar = true

    disneyApi
        .getAllCharacters(page)
        .then(response => res.render('characters/list-characters', { characters: response.data, nextPage, prevPage, showSearchBar }))
        .catch(err => next(err))
})

router.post('/search', isLoggedIn, (req, res, next) => {

    console.log('CONTROLLER ON-------')

    const { search_query } = req.body
    const showSearchBar = true

    disneyApi
        .searchOneCharacter(search_query)
        .then(response => {
            const charactersArray = Array.isArray(response.data.data) ? response.data.data : [response.data.data]
            res.render('characters/search-character', { characters: charactersArray, showSearchBar })
        })
        .catch(err => next(err))
})


module.exports = router