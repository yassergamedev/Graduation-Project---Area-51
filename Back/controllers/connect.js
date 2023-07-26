const mongoose = require('mongoose');

module.exports = function (){
mongoose.connect("mongodb://127.0.0.1:27017/area51h", {useNewUrlParser : true});
console.log("connected to db")
}

