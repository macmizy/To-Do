const todo = require("../models/to-do.model")


async function getMainPage(req,res){
    try{
        const tasks = await todo.find({userId: req.oidc.user.sid})
        res.render("index.ejs", {task: tasks, user: req.oidc.user})

    }catch(error){
        console.log(error)
    }
}

async function mainPost(req,res){
    const newTask = req.body.task
    try{
        const task = await todo.create({task: newTask, userId: req.oidc.user.sid})
        res.redirect('/main')
    }catch(error){
        res.redirect('/main')
        console.log(error)
    }
}

async function getEditPage(req,res){
    const id = req.params.id 
    try{
        const tasks = await todo.find({userId: req.oidc.user.sid})
        res.render("edit.ejs",{task: tasks, taskId: id,user: req.oidc.user})
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
        res.redirect("/main")

    }catch(error){
        res.status(500).redirect("/main")
        console.log(error)
    }
}

async function deleteTask(req,res){
    const id = req.params.id 
    try{
        const tasks = await todo.findByIdAndDelete(id)
        res.redirect("/main")

    }catch(error){
        res.status(500).redirect("/main")
        console.log(error)
    }
}

function exitPage(req,res){
    try{
        res.render("exit.ejs",{user: req.oidc.user})
    }catch(error){
        console.log(error)
    }

}

function profilePage(req,res){
    try{
        res.render("profile.ejs",{user: req.oidc.user})

    }catch(error){
        console.log(error)
        res.render("profile.ejs")
    }
}

async function callback(req,res){
    try {
        res.send({message: "wecome"})
        res.redirect("/main")
    
    } catch (error) {
        console.log(error)
    } 
         
}

module.exports = {
    getMainPage,mainPost,deleteTask,getEditPage,postEdit,exitPage,profilePage,callback
}