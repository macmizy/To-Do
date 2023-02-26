const mongoose = require('mongoose');

const schema = mongoose.Schema

const todoSchema = new schema({
task: {
type: String,
required: true
},
date: {
type: Date,
default: Date.now
},
userId: {
    type: String,
}
})
const todoModel = mongoose.model('Todo',todoSchema);

module.exports = todoModel