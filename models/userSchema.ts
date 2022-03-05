import * as mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    thumbnail:{type:String},
    isAdmin:{type:Boolean},
    street:{type:String},
    number:{type:Number},
    district:{type:String},
    reference:{type:String},

    
    
});


export default userSchema;