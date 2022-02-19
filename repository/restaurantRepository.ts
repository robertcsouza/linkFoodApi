import * as mongoose from 'mongoose';
import RestaurantSchema from '../models/restaurantSchema';

export default mongoose.model('restaurants',RestaurantSchema);