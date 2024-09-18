const express = require('express')
const router = express.Router()
const gamesController = require('../controllers/gameController')

router.get('/', (req,res) => res.render('index'))

router.get('/games', gamesController.getGames)
router.get('/games/details/:id', gamesController.getDetails)
router.get('/games/edit/:id', gamesController.editGame)
router.get('/games/delete/:id', gamesController.getDeleteGame)
router.post('/games/delete/:id', gamesController.deleteGame)
router.post('/games/edit/:id', gamesController.editGamePost)

router.get('/games/create', gamesController.getGameForm)
router.post('/games/create', gamesController.createGame)
router.get('/games/redirect', gamesController.getRedirect)

  module.exports = router;