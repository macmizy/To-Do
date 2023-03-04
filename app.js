const express = require("express")
const controller = require("./controllers/to-do.controller")
const { requiresAuth } = require('express-openid-connect');
const auth0Middleware = require("./auth/auth0")
const rateLimit = require('express-rate-limit')
const helmet = require("helmet")
const logger = require('./logger/logger')
require("dotenv").config()
require('./db').connectToMongoDB()




const app = express()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true, 
	legacyHeaders: false,
})
app.use(limiter)

app.use(helmet());

app.set("view engine", "ejs")
app.set('views','views')

app.use("/static", express.static("public"))

app.use(express.urlencoded({extended: true}))

app.use(auth0Middleware)

app.get("/", controller.getMainPage)

app.get("/profile",requiresAuth(), controller.profilePage)

app.post("/", controller.mainPost)

app.get("/edit/:id",requiresAuth(), controller.getEditPage)

app.post("/edit/:id", controller.postEdit)

app.get("/remove/:id",requiresAuth(), controller.deleteTask)

app.get("/home", controller.landingPage)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

