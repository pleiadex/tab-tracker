const {Song} = require('../models')
const { Op } = require("sequelize");

module.exports = {
    async index (req, res) {
        try{
            let songs = []
            const search = req.query.search
            console.log(`The requested search string: ${search}`)
            if (search) {
                songs = await Song.findAll({
                    where: {
                        [Op.or]: [
                            'title', 'artist', 'genre', 'album'
                        ].map(key => ({
                            [key]: {
                                [Op.like]: `%${search}%`
                            }
                        }))
                    }
                })
            } else {
                songs = await Song.findAll({
                    limit: 10
                })
            }
            res.send(songs)
                    
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has occured trying to fetch the songs'
            })
        }
    },
    async show (req, res) {
        try{
            const song = await Song.findByPk(req.params.songId)
            res.send(song)
                    
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has occured trying to fetch the requested song.'
            })
        }
    },
    async post (req, res) {
        try{
            console.log("Create a Song")
            const song = await Song.create(req.body)
            console.log(song)
            res.send(song)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has occured trying to create the song'
            })
        }
    },
    async put (req, res) {
        try{
            await Song.update(req.body, {
                where: {
                    id: req.params.songId
                }
            })
            res.send(req.body)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has occured trying to update the song'
            })
        }
    }
}
