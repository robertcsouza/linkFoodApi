import * as mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    thumbnail:{type:String},
    isAdmin:{type:Boolean} 
});


export default userSchema;