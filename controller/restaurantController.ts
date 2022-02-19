import restaurantService from "../services/restaurantService";
import * as jwt from 'jsonwebtoken';
import * as HttpStatus from 'http-status';
import * as hash from 'md5';
import helper from "../config/helper";
import configs from "../config/configs";
import { userInfo } from "os";


//TODO update user 
// TODO upload image

class NewsController {
    constructor() {

    }

    async  index(req,res){
        try {
          
            const restaurants = await restaurantService.get();
          
            helper.sendResponse(res, HttpStatus.UNAUTHORIZED, restaurants);

            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
    }


    async create(req, res){

        try {
            const user = req.user; 
            
            if(!user) return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'ação não pode ser realizada' });
            const {name,freight,duration} = req.body;
            
            const userExist = await restaurantService.getOne({owner:user._id});
        
            if (userExist) {
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Usuário já possui um estabelecimento' });
            }

            const restaurant = {
                name,
                freight,
                duration,
                owner:user._id
                
            }    

            await restaurantService.create(restaurant)

            return helper.sendResponse(res, HttpStatus.OK, { msg: 'Restaurante criado com sucesso' });


            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
        }
    async update(req,res){
 
        try {
            const user = req.user; 
            const restaurant = req.body;
     
            if(!user) return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'ação não pode ser realizada' });
                     
            const restaurantExist = await restaurantService.getOne({owner:user._id});
        
            if (!restaurantExist) return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Estabelecimento nao encotrado' });
            
            await restaurantService.update(restaurantExist._id,restaurant)

            return helper.sendResponse(res, HttpStatus.OK, {msg:'Restaurante atualizado'} );

            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
    } 
    
    
    async thumbnail(req,res){
        try {
            const {_id} = req.user;    
            const { filename } = req.file; 
            const restaurant = await restaurantService.getOne({owner:_id})
            
            if(!restaurant)  return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Estabelecimento nao encotrado' }); 
            
            await restaurantService.update(restaurant._id, {thumbnail:`http://localhost:3050/files/${filename}`})
            
            helper.sendResponse(res, HttpStatus.OK, { msg: `http://localhost:3050/files/${filename}`}); 

        } catch (error) {
            console.log(error)
        }
   }


 
  

 }

export default new NewsController();