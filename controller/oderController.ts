import restaurantService from "../services/restaurantService";
import productService from "../services/productsService";
import orderService from "../services/orderService";
import * as HttpStatus from 'http-status';
import helper from "../config/helper";

class OrderController {
    constructor() {

    }

    /*
    
    total:{type:Number},
    obs:{type:String},
    status:{type:String},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
        },
    restaurants:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'restaurants'
        },    

    products:{type:Array}
    
    */

    async  index(req,res){

        try {
            const user = req.user; 
            if(!user) return  helper.sendResponse(res, HttpStatus.UNAUTHORIZED, {msg:'Não authorizado'})
            
            if(user.isAdmin){
                //retornar orders admin
                const restaurant = await restaurantService.getOne({owner:user._id});
                
                if(!restaurant) return  helper.sendResponse(res, HttpStatus.UNAUTHORIZED, {msg:'restaurante nao encomtrado'})

                const orders = await orderService.get({restaurant:restaurant._id})

                return  helper.sendResponse(res, HttpStatus.OK, orders);

            }else{
                //retornar order usuario
                
                const orders = await orderService.get({user:user._id})

                return  helper.sendResponse(res, HttpStatus.OK, orders);
            }
            

            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
    }

        async  indexOne(req,res){

            try {
                const user = req.user; 
                const { id } = req.params;
                if(!user) return  helper.sendResponse(res, HttpStatus.UNAUTHORIZED, {msg:'Não authorizado'})
                
                if(user.isAdmin){
                    //retornar orders admin
                    const restaurant = await restaurantService.getOne({owner:user._id});
                    
                    if(!restaurant) return  helper.sendResponse(res, HttpStatus.UNAUTHORIZED, {msg:'restaurante nao encomtrado'})

                    const order = await orderService.getById(id)

                    if(order.restaurants.toString() !== restaurant._id.toString()) return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Não autorizado' }); 
                    
                    return  helper.sendResponse(res, HttpStatus.OK, order);

                }else{
                    //retornar order usuario
                    
                    const order = await orderService.getById(id)
                   
                    if(order.user.toString() !== user._id.toString()) return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Não autorizado' });
                        
                   
                     return  helper.sendResponse(res, HttpStatus.OK, order);
                   
                }
                
                } catch(error) {
                    console.log(`Error ${error}`)
                    return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

                } 
        }


    async create(req, res){

        try {
            const user = req.user; 
            
            if(!user) return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'ação não pode ser realizada' });
            
            const {total,obs,status,products,restaurants} = req.body;
            
            const order = {
                total,
                obs,
                status,
                user: user._id,
                restaurants,
                products
            }
            
            const orderResult =  await orderService.create(order);

            return helper.sendResponse(res, HttpStatus.OK, orderResult);

            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
        }


    async update(req,res){
        try {
            const user = req.user; 
            const { id } = req.params;
            const {status} = req.body;
            if(!user) return  helper.sendResponse(res, HttpStatus.UNAUTHORIZED, {msg:'Não authorizado'})
            
            if(user.isAdmin){
                //retornar orders admin
                const restaurant = await restaurantService.getOne({owner:user._id});
                
                if(!restaurant) return  helper.sendResponse(res, HttpStatus.UNAUTHORIZED, {msg:'restaurante nao encomtrado'})

                const order = await orderService.getById(id)
                
                if(!order) return  helper.sendResponse(res, HttpStatus.UNAUTHORIZED, {msg:'pedido não encontrado'})
                
                await orderService.update(id,{status});
                
                return helper.sendResponse(res, HttpStatus.OK, { msg: 'Pedido atualizado' });

            }
           
            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
    } 
      

 }

export default new OrderController();