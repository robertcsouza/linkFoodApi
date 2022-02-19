import userService from "../services/userService";
import * as jwt from 'jsonwebtoken';
import * as HttpStatus from 'http-status';
import * as hash from 'md5';
import helper from "../config/helper";
import configs from "../config/configs";


//TODO update user 
// TODO upload image

class NewsController {
    constructor() {

    }

    async session(req, res) {
       
        try {
            const { email, password } = req.body;
            const hashPassword = hash(password);
            const  options = {email,password:hashPassword}
            const user = await userService.getOne(options);
            if (!user) {
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Usuário não encontrado' });
            }
             const payload ={
                "_id": user._id,
                "name": user.name,
                "email": user.email,
                "isAdmin":user.isAdmin            
                 }   
            var token = jwt.sign(payload, configs.secret);

            return helper.sendResponse(res, HttpStatus.OK, {
                token: token,
            });

            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            }
    }



    async create(req, res){
        
        try {
            const {email,password,passwordConfirm, name,isAdmin} = req.body;
            
            if(password !== passwordConfirm){
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'As senhas nao são iguais' });
            }
            
            const hashPassword = hash(password);
            
            const user = await userService.getOne({email});
        
            if (user) {
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Usuário existente' });
            }

            await userService.create({name,email,password:hashPassword,isAdmin})

            return helper.sendResponse(res, HttpStatus.OK, { msg: 'Usuário criado com sucesso' });


            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
        }
    async update(req,res){
         console.log(req.user);
    } 
    
    
    async thumbnail(req,res){
        try {
            const { filename } = req.file; 
            return helper.sendResponse(res, HttpStatus.OK, { msg: `http://localhost:3050/files/${filename}`}); 
        } catch (error) {
            console.log(error)
        }
   }


 
  

 }

export default new NewsController();