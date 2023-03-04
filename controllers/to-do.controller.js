const todo = require("../models/to-do.model")
const logger = require("../logger/logger")


async function getMainPage(req,res){
    try{
        const tasks = await todo.find({userId: req.oidc.user.email})
        res.render("index.ejs", {task: tasks, user: req.oidc.user})

    }catch(error){
        res.redirect('/home')
    }
}

async function mainPost(req,res){
    const newTask = req.body.task
    try{
        const task = await todo.create({task: newTask, userId: req.oidc.user.email})
        res.redirect('/')
    }catch(error){
        res.redirect('/')
        logger.error(err.message)
    }
}

async function getEditPage(req,res){
    const id = req.params.id 
    try{
        const tasks = await todo.find({userId: req.oidc.user.email})
        res.render("edit.ejs",{task: tasks, taskId: id,user: req.oidc.user})
    }catch(error){
        res.status(500)
        logger.error(err.message)
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
        logger.error(err.message)
    }
}

async function deleteTask(req,res){
    const id = req.params.id 
    try{
        const tasks = await todo.findByIdAndDelete(id)
        res.redirect("/")

    }catch(error){
        res.status(500).redirect("/")
        logger.error(err.message)
    }
}

function landingPage(req,res){
    try{
        res.render("landingpage.ejs")
    }catch(error){
        res.status(500).redirect("/")
        logger.error(err.message)

    }

}

function profilePage(req,res){
    try{
        res.render("profile.ejs",{user: req.oidc.user})

    }catch(error){
        res.status(500).redirect("/")
        logger.error(err.message)
    }
}


module.exports = {
    getMainPage,mainPost,deleteTask,getEditPage,postEdit,landingPage,profilePage
}