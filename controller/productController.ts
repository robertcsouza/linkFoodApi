import restaurantService from "../services/restaurantService";
import productService from "../services/productsService";
import * as HttpStatus from 'http-status';
import helper from "../config/helper";

class ProductController {
    constructor() {

    }

    async  index(req,res){

        try {
            const { id } = req.params;
            const restaurant = await restaurantService.getOne({_id:id});

            if(!restaurant) helper.sendResponse(res, HttpStatus.UNAUTHORIZED, {msg:'restaurante nao encomtrado'})

            const products = await productService.getById(restaurant._id);
      
            helper.sendResponse(res, HttpStatus.UNAUTHORIZED, products);

            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
    }


    async create(req, res){

        try {
            const user = req.user; 
            
            if(!user) return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'ação não pode ser realizada' });
            const {name,price,description} = req.body;
            
            const userExist = await restaurantService.getOne({owner:user._id});
        
            if (!userExist) {
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Restaurante nao encontrado' });
            }

  
  
            const product = {
                name,
                price,
                description,
                restaurant: userExist._id    
            }    

            const productResult =  await productService.create(product)

            return helper.sendResponse(res, HttpStatus.OK, productResult);


            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
        }
    async update(req,res){
        try {
            const user = req.user; 
            const product = req.body;
            const {id} = req.params;
            if(!user) return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'ação não pode ser realizada' });
              
            const userExist = await restaurantService.getOne({owner:user._id});
        
            if (!userExist) {
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Restaurante nao encontrado' });
            }
  await productService.update(id,product)

            return helper.sendResponse(res, HttpStatus.OK,  { msg: 'produto atualizado' });


            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
    } 
    
    
    async thumbnail(req,res){
        try {
            const {_id} = req.user;    
            const { filename } = req.file;
            const {id} = req.params; 
            const restaurant = await restaurantService.getOne({owner:_id})
            
            if(!restaurant)  return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Estabelecimento nao encotrado' }); 
            
            await productService.update(id, {thumbnail:`http://localhost:3050/files/${filename}`})
            
            helper.sendResponse(res, HttpStatus.OK, { msg: `http://localhost:3050/files/${filename}`}); 

        } catch (error) {
            console.log(error)
        }
   }


 
  

 }

export default new ProductController();