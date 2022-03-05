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
                "email": user.email          
                 }   
            var token = jwt.sign(payload, configs.secret);

            return helper.sendResponse(res, HttpStatus.OK, {
                token: token,
                name: user.name,
                email: user.email,
                isAdmin:user.isAdmin, 
                street: user.street,
                number: user.number,
                district: user.district,
                reference: user.reference,
                thumbnail: user.thumbnail,
            });

            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            }
    }



    async create(req, res){
        
        try {
            const {email,password,passwordConfirm, name,isAdmin,street,number,district,reference} = req.body;
            
            if(password !== passwordConfirm){
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'As senhas nao são iguais' });
            }
            
            const hashPassword = hash(password);
            
            const user = await userService.getOne({email});
        
            if (user) {
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Usuário existente' });
            }

            await userService.create({name,email,password:hashPassword,isAdmin,street,number,district,reference})

            return helper.sendResponse(res, HttpStatus.OK, { msg: 'Usuário criado com sucesso' });


            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
        }
    async update(req,res){
        const user =  req.user
        const {name} = req.body;
       
        if(!user) return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Usuário não encontrado' });
        
        await userService.update(user._id,{"name":name})
        helper.sendResponse(res, HttpStatus.OK, { msg: 'Usuario atualizado' });

    } 
    
    
    async thumbnail(req,res){
        try {
            const user =  req.user
            const {name} = req.body;
            const { filename } = req.file; 
            //return helper.sendResponse(res, HttpStatus.OK, { msg: `http://localhost:3050/files/${filename}`}); 
         
            if(!user) return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Usuário não encontrado' });
        
        await userService.update(user._id,{"thumbnail":`http://192.168.100.9:3050/files/${filename}`})
        helper.sendResponse(res, HttpStatus.OK, { msg:`http://192.168.100.9:3050/files/${filename}` });
        } catch (error) {
            console.log(error)
        }
   }


 
  

 }

export default new NewsController();