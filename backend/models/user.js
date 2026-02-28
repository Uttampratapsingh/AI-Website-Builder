import moongoose from 'mongoose';


const userSchema = new moongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    avatar:{
        type:String,
    },
    credits:{
        type:Number,
        default:100,
        min:0
    },
    plan:{
        type:String,
        enum:['free','pro','enterprise'],
        default:'free'
    }
},{timestamps:true});

const User = moongoose.model('User',userSchema,'Users-AIWeb');

export default User;