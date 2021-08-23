const router = require('express').Router()
const UserService = require('../services/UserService')

router.route('/login').post(UserService.login)

module.exports = router
