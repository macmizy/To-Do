const express = require("express")
const controller = require("./controllers/to-do.controller")
const { requiresAuth } = require('express-openid-connect');
const auth0Middleware = require("./auth/auth0")
require("dotenv").config()
require('./db').connectToMongoDB()




const app = express()
app.set("view engine", "ejs")
app.set('views','views')

app.use("/static", express.static("public"))

app.use(express.urlencoded({extended: true}))

app.use(auth0Middleware)

app.get("/main", controller.getMainPage)

app.get("/call", controller.callback)

app.get("/profile",requiresAuth(), controller.profilePage)

app.post("/", controller.mainPost)

app.get("/edit/:id",requiresAuth(), controller.getEditPage)

app.post("/edit/:id", controller.postEdit)

app.get("/remove/:id",requiresAuth(), controller.deleteTask)

app.get("/exit",requiresAuth(), controller.exitPage)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

