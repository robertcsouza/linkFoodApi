import newsController from '../controller/newsController';
import userController from '../controller/userController';
import auth from '../config/auth';
import uploads from '../config/uploads';
    

  class Routes {
    routes (app){
        
        
        
        app.route('/').get((req,res)=>{
            res.send({version:'0.0.1'});
        });
       

        app.route('/uploads').post(uploads.single('file'),(req,res)=>{
            try {
                res.send("arquivo enviado com sucesso!");
            } catch (error) {
                console.log(error);  
            }
        })
        
        //session Routes
        app.route('/api/v1/session').post(userController.session);

        //User Routes
        app.route('/api/v1/user/create').post(userController.create); 
        
       app.use(auth.validate) 

       //User with authentication 
       app.route('/api/v1/user/update').post(userController.update); 
       app.route('/api/v1/user/thumbnail').post(uploads.single('file'),userController.thumbnail) 

       app.route('/api/v1/news').get(newsController.get); 
       app.route('/api/v1/news/:id').get(newsController.getById); 
       app.route('/api/v1/news').post(newsController.create); 
       app.route('/api/v1/news/:id').put(newsController.update); 
       app.route('/api/v1/news/:id').delete(newsController.delete); 
       


    }
  }

  export default new Routes();