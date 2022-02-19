import newsService from "../services/newsService";
import * as HttpStatus from 'http-status';
import helper from "../config/helper";



 class NewsController {
     constructor() {
         
     }

   

     get(req,res){
            newsService.get().then((news=> helper.sendResponse(res,HttpStatus.OK,news))).catch(error => console.error.bind(console,`Error ${error}`))
      }
  
      getById(req,res){
          const _id = req.params.id;
          newsService.getById(_id).then((news=> helper.sendResponse(res,HttpStatus.OK,news))).catch(error => console.error.bind(console,`Error ${error}`))
      }
  
      create(req,res){
         let vm = req.body;
         newsService.create(vm).then((news=> helper.sendResponse(res,HttpStatus.OK,"Notícia cadastrada com sucesso"))).catch(error => console.error.bind(console,`Error ${error}`))
      }
  
      update(req,res){
        const _id = req.params.id;
        let vm = req.body;
        newsService.update(_id,vm).then((news=> helper.sendResponse(res,HttpStatus.OK,`${news.title} foi atualizada com sucesso`))).catch(error => console.error.bind(console,`Error ${error}`))
      }
  
      delete(req,res){
        const _id = req.params.id;
       
        newsService.delete(_id).then((news=> helper.sendResponse(res,HttpStatus.OK,`Notícia foi deletada com sucesso`))).catch(error => console.error.bind(console,`Error ${error}`))
      }
  

 }

 export default new NewsController();