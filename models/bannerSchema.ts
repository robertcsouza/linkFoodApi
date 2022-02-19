import * as mongoose from 'mongoose';


const bannerSchema = new mongoose.Schema({
    url:{type:String},
});


export default bannerSchema;