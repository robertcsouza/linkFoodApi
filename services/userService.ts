import UsersSchema from "../models/userSchema";
import userRepository from "../repository/userRepository";

class  NewsService {
    constructor() {
        
    }

    async getOne(options : Object){
        return await userRepository.findOne(options); 
    }

    async create(user: Object){
       return await userRepository.create(user)
    }

    async update(_id:String,user){
      return await userRepository.findByIdAndUpdate(_id,user);
    }

    async delete(_id:String){
        return await userRepository.findByIdAndRemove(_id);
    }



}


export default new NewsService();