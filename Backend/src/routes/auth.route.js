const express = require("express")
const authUser = require("../Controllers/authcontroller")
const route = express.Router()

route.get('/fetchUser', authUser.getUser)
route.post('/register', authUser.userRegister)
route.post('/login', authUser.loginUser)
route.post('/logout',authUser.logout)

module.exports = route