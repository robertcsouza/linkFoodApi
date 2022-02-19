import * as mongoose from 'mongoose';
import BannerSchema from '../models/bannerSchema';

export default mongoose.model('banners',BannerSchema);