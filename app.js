const express = require("express")
require("dotenv").config()






const app = express()
app.set("view engine", "ejs")
app.set('views','views')

app.use("/static", express.static("public"))

app.use(express.urlencoded({extended: true}))

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.post("/",(req, res)=>{
    console.log(req.body)
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})

