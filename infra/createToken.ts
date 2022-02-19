import * as jwt from 'jsonwebtoken';

import * as configs from './configs'
 class CreateToken {
     constructor() {
        
       
     }  

     cToken(){
        let payload = {
            iss:"teste@teste.com",
            iat: new Date().getSeconds(),
            exp: new Date().setMinutes(60),
            name:"Roberto c",
            email:"robert@teste.com"
        };
        
        var token = jwt.sign(payload,configs.default.secret);
        
        console.log(token);
        
     }
 }


 export default new CreateToken();