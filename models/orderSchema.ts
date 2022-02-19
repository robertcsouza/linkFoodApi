import * as mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({

    total:{type:Number},
    obs:{type:String},
    status:{type:String},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
        },
    restaurants:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'restaurants'
        },    

    products:{type:Array}
    
    
});


export default orderSchema;