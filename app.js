const express = require("express")
const controller = require("./controllers/to-do.controller")
require("dotenv").config()
require('./db').connectToMongoDB()




const app = express()
app.set("view engine", "ejs")
app.set('views','views')

app.use("/static", express.static("public"))

app.use(express.urlencoded({extended: true}))

app.get("/", controller.getMainPage)

app.post("/", controller.mainPost)

app.get("/edit/:id", controller.getEditPage)

app.post("/edit/:id", controller.postEdit)

app.get("/remove/:id", controller.deleteTask)

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

