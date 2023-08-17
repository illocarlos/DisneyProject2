const axios = require('axios')

class disneyApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://api.disneyapi.dev/character'
        })
    }

    getAllCharacters(page = 1) {
        const searchParam = new URLSearchParams({ page })
        return this.axiosApp.get('/', { params: searchParam })
    }

    getOneCharacter(character_id) {
        return this.axiosApp.get(`/${character_id}`)
    }

    searchOneCharacter(character_name) {
        const searchParam = new URLSearchParams({ name: character_name })
        return this.axiosApp.get('/', { params: searchParam })

    }
}

const disneyApi = new disneyApiHandler()

module.exports = disneyApi