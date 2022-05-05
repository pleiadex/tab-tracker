const {
  History,
  Song
  } = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try{
      // const {userId} = req.query
      const userId = req.user.id

      const historys = (await History.findAll({
        where: {
          UserId: userId
        },
        limit: 10,
        include: [
          {
            model: Song
          }
        ]
      })).map(history => history.toJSON())
        .map(history => _.extend(
          {},
          history.Song,
          history
        ))

      res.send(historys) //_.uniqBy(historys, history => history.SongId))
      
    } catch (err) {
      console.log(err)
      res.status(500).send({
          error: 'An error has occured trying to fetch the recently viewed songs'
      })
    }
  },
  async post (req, res) {
    try{
      // const {songId, userId} = req.body.params
      const {songId} = req.body.params
      const userId = req.user.id

      // Add functionality to create a single history log for each song
      const history = await History.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (history) {
        await history.destroy()
      }

      const newHistory = await History.create({
        SongId: songId,
        UserId: userId
      })

      res.send(newHistory)


    } catch (err) {
      console.log(err)
      res.status(500).send({
          error: 'An error has occured trying to create the new viewed song'
      })
    }
  }
}
