import * as mongoose from 'mongoose';
import productSchema from '../models/productSchema';

export default mongoose.model('products',productSchema);