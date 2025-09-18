const express = require("express")
const userRoute = require("../src/routes/auth.route")
const chatRoute = require("../src/routes/chat.route")
const Cors = require('cors')
const cookieParser = require("cookie-parser")
const app = express()
const path = require('path')


app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')));
app.use(Cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use('/api/auth', userRoute)
app.use('/api/chat', chatRoute)

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})
module.exports = app