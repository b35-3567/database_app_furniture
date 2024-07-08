const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,

    },
    pageNumber:{
        type:Number,
        default:0
    }
})
const Books=mongoose.model('Books',bookSchema);
module.exports=Books;