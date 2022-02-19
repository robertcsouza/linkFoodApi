import NewsSchema from "../models/newsSchema";
import newsRepository from "../repository/newsRepository";

class  NewsService {
    constructor() {
        
    }

    async get(){
      return await newsRepository.find({});      
    }

    async getById(_id:String){
        return await newsRepository.findById(_id); 
    }

    async create(news){
       return await newsRepository.create(news)
    }

    async update(_id:String,news){
      return await newsRepository.findByIdAndUpdate(_id,news);
    }

    async delete(_id:String){
        return await newsRepository.findByIdAndRemove(_id);
    }



}


export default new NewsService();