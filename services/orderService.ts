import orderRepository from "../repository/orderRepository";

class  OrderService {
    constructor() {
        
    }

 
    async getById(_id:String){
        return await orderRepository.findById(_id); 
    }

    async create(order){
       return await orderRepository.create(order)
    }

    async update(_id:String, order){
        
        return await orderRepository.findByIdAndUpdate({_id:_id},order);
    }

    async delete(_id:String){
        return await orderRepository.findByIdAndRemove(_id);
    }



}


export default new OrderService();