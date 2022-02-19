import * as mongoose from 'mongoose';


const restaurantSchema = new mongoose.Schema({
    name:{type:String},
    freight:{type:Number},
    duration:{type:String},
    thumbnail:{type:String},
    rating:{type:Number},
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
}
});


export default restaurantSchema;