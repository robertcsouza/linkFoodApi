import * as mongoose from 'mongoose';
import orderSchema from '../models/orderSchema';

export default mongoose.model('orders',orderSchema);