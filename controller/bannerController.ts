import bannerService from "../services/bannerService";
import * as HttpStatus from 'http-status';
import helper from "../config/helper";

class BannerController {
    constructor() {

    }

    async  index(req,res){
        try {
          
            const banners = await bannerService.get();
          
            helper.sendResponse(res, HttpStatus.OK, banners);

            } catch(error) {
                console.log(`Error ${error}`)
                return helper.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });

            } 
    }
    
    async thumbnail(req,res){
        try {
            const { filename } = req.file; 
          
              await bannerService.create({url:`http://localhost:3050/files/${filename}`})     

            helper.sendResponse(res, HttpStatus.OK, { msg: `http://localhost:3050/files/${filename}`}); 

        } catch (error) {
            console.log(error)
        }
   }


 
  

 }

export default new BannerController();