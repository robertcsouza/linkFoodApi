import restaurantRepository from "../repository/restaurantRepository";

class  NewsService {
    constructor() {
        
    }

    async get(){
        return await restaurantRepository.find({}); 
    
    }async getOne(options : Object){
        return await restaurantRepository.findOne(options); 
    }

    async create(restaurant: Object){
       return await restaurantRepository.create(restaurant)
    }

    async update(_id:String,restaurant:Object){
      return await restaurantRepository.findByIdAndUpdate(_id,restaurant);
    }

    async delete(_id:String){
        return await restaurantRepository.findByIdAndRemove(_id);
    }



}


export default new NewsService();