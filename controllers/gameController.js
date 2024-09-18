const asyncHandler = require("express-async-handler")
const db = require('../db/queries')
const { body, validationResult } = require("express-validator")

const requiredErr = 'required'
const lengthErr = 'must be less than 20 characters'
const urlErr = 'must be URL format'


const validateGame = [
    body('title')
        .trim()
        .notEmpty().withMessage(`title ${requiredErr}`),
    body('image')
        .trim()
        .optional({ checkFalsy: true })
        .isURL().withMessage(`image ${urlErr}`),
    body('description')
        .trim()
        .optional()
        .isLength({ max: 20 }).withMessage(`description ${lengthErr}`),
    body('company')
        .trim()
        .optional({ checkFalsy: true })
        .isLength({ max: 20 }).withMessage(`company ${lengthErr}`),
    body('console')
        .trim()
        .optional({ checkFalsy: true })
        .isLength({ max: 20 }).withMessage(`company ${lengthErr}`),
]

exports.getGames = async (req, res) => {
    const games = await db.getAllGames()
    //console.log(games)
    res.render('games/games', { title: "Games", games: games })
}

exports.getDetails = async (req, res) => {
    const id = req.params.id
    console.log('id:' + id)
    const [game] = (await db.getGame(id))
    console.log(game)
    res.render('games/details', { title: game.title, game: game })
}

exports.editGame = async (req, res) => {
    const id = req.params.id 
    const [game] = (await db.getGame(id))
    console.log(game)
    res.render('games/create', {game:game})
}

exports.editGamePost = [
    validateGame,
    async (req, res) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).render("games/create", {
                title: "Update Game",
                errors: errors.array(),
            });
        }
        const id = req.params.id
        console.log(id)
        const { title, image: imageurl, description, company, console: gameconsole } = req.body
        console.log(title, imageurl, description, company, gameconsole);

        const companyCount = (await db.getCompanyCount(company)).length
        const consoleCount = (await db.getConsoleCount(gameconsole)).length

        console.log(companyCount)
        if (companyCount == 0) { 
            await db.addCompany(company)
        }
        
        console.log(consoleCount)
        if (consoleCount == 0) { 
            await db.addConsole(gameconsole)
        }
        
        await db.updateGame(id, title, imageurl, description, company, gameconsole)
        res.redirect('/games')
    }
]

exports.getDeleteGame = async (req, res) => {
    const id = req.params.id
    res.render('games/delete', {id: id})
}

exports.deleteGame = async (req, res) => {
    console.log('delete post')
    const id = req.params.id
    await db.deleteGame(id)
    res.redirect('/games')
}

exports.getGameForm = async (req, res) => {
    res.render('games/create')
}

exports.getRedirect = async (req, res) => {
    res.redirect('/games')
}

exports.createGame = [
    validateGame,
    async (req, res) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).render("games/create", {
                title: "Add Game",
                errors: errors.array(),
            });
        }
        const { title, image: imageurl, description, company, console: gameconsole } = req.body
        console.log(title, imageurl, description, company, gameconsole)

        const companyCount = (await db.getCompanyCount(company)).length
        const consoleCount = (await db.getConsoleCount(gameconsole)).length

        console.log(companyCount)
        if (companyCount == 0) { 
            await db.addCompany(company)
        }
        
        console.log(consoleCount)
        if (consoleCount == 0) { 
            await db.addConsole(gameconsole)
        }
        
        await db.insertGame(title, imageurl, description, company, gameconsole)
        res.redirect('/games')
    }
]
