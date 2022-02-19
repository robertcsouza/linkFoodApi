import * as mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name:{type:String},
    price:{type:Number},
    desciption:{type:String},
    thumbnail:{type:String},
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'restaurants'
        }    
    
    
});


export default productSchema;