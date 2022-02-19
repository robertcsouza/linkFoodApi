import * as jwt from 'jsonwebtoken';
import * as configs from './configs';

class Auth {
    
    validate(req,res,next){
        var token = req.headers['x-access-token'];
        if(token){
            jwt.verify(token,configs.default.secret,function(err,decoded){
                if(err){
                    return res.status(403).send({
                        success:false,
                        message:'403 - unauthorized'
                    })

                   
                   
                }else{
                    req.user= decoded;
                    next();
                }
            })
        }else{
            
            return res.status(401).send({
                success:false,
                message:'401 - unauthorized'
            })

        }
    }
}

export default new Auth();