import bannerRepository from "../repository/bannerRepository";

class  NewsService {
    constructor() {
        
    }

    async get(){
        return await bannerRepository.find({}); 
    
    }

    async create(restaurant: Object){
       return await bannerRepository.create(restaurant)
    }

    async delete(_id:String){
        return await bannerRepository.findByIdAndRemove(_id);
    }



}


export default new NewsService();