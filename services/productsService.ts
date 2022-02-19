import productRepository from "../repository/productRepository";

class  ProductService {
    constructor() {
        
    }

 
    async getById(_id:String){
        return await productRepository.find({restaurant:_id}); 
    }

    async create(product){
       return await productRepository.create(product)
    }

    async update(_id:String,product){
        
        return await productRepository.findByIdAndUpdate({_id:_id},product);
    }

    async delete(_id:String){
        return await productRepository.findByIdAndRemove(_id);
    }



}


export default new ProductService();