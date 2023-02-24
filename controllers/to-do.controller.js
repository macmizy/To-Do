const todo = require("../models/to-do.model")

async function getMainPage(req,res){
    try{
        const tasks = await todo.find({})
        res.render("index.ejs", {task: tasks})

    }catch(error){
        console.log(error)
    }
}

async function mainPost(req,res){
    newTask = req.body.task
    try{
        const task = await todo.create({task: newTask})
        res.redirect('/')
    }catch(error){
        res.redirect('/')
        console.log(error)
    }
}

async function getEditPage(req,res){
    const id = req.params.id 
    try{
        const tasks = await todo.find({})
        res.render("edit.ejs",{task: tasks, taskId: id})
    }catch(error){
        res.status(500)
        console.log(error)
    }
}

async function postEdit(req,res){
    const id = req.params.id 
    const taskInput = req.body.task
    try{
        const tasks = await todo.findByIdAndUpdate(id,{task: taskInput})
        res.redirect("/")

    }catch(error){
        res.status(500).redirect("/")
        console.log(error)
    }
}

async function deleteTask(req,res){
    const id = req.params.id 
    try{
        const tasks = await todo.findByIdAndDelete(id)
        res.redirect("/")

    }catch(error){
        res.status(500).redirect("/")
        console.log(error)
    }
}

function exitPage(req,res){
    try{
        res.render("exit.ejs")
    }catch(error){
        console.log(error)
    }

}

function profilePage(req,res){
    try{
        console.log(req.oidc.user)
        res.render("profile.ejs",{user: req.oidc.user})

    }catch(error){
        console.log(error)
        res.render("profile.ejs")
    }
}

module.exports = {
    getMainPage,mainPost,deleteTask,getEditPage,postEdit,exitPage,profilePage
}