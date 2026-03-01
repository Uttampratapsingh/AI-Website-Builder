import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:['user','ai'],
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

const websiteSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId, // it will store the id of the user from the User collection. it is a reference to the User model.
        ref:'User', 
        required:true
    },
    title:{
        type:String,
        default:"Untitled Website",
    },
    latestCode:{
        type:String,
        required:true,
    },
    conversation:[
        messageSchema // it will store the conversation between the user and the ai. it is an array of messages. each message has a role (user or ai) and content (the message itself).
    ],
    deployed:{
        type:Boolean,
        default:false
    },
    deployUrl:{
        type:String,
    },
    slug:{
        type:String,
        unique:true,
        sparse:true // it will allow multiple null values in the slug field. because when we create a new website, we dont have the slug yet and it will be null. without sparse:true, it will throw an error because of unique:true constraint.
    }

},{timestamps:true});

const Website = mongoose.model('Website',websiteSchema,'Websites-AIWeb'); //third field is the name of the collection in the database. if we dont provide it, it will take the plural form of the model name (Websites) and it will create a collection with that name. but we want to have a custom name for the collection, so we provide it as the third argument.

export default Website;