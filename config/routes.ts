import newsController from '../controller/newsController';
import userController from '../controller/userController';
import restaurantController from '../controller/restaurantController';
import bannerController from '../controller/bannerController';
import auth from '../config/auth';
import uploads from '../config/uploads';
import productController from '../controller/productController';
import orderController from '../controller/oderController';

    

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

        //Restaurants index
        app.route('/api/v1/restaurant').get(restaurantController.index); 

        //products index

        app.route('/api/v1/product').get(productController.index); 

        //insert banner
        app.route('/api/v1/banner/thumbnail').post(uploads.single('file'),bannerController.thumbnail) 
        app.route('/api/v1/banner').get(bannerController.index); 

       app.use(auth.validate) 

       //User with authentication 
       app.route('/api/v1/user/update').put(userController.update); 
       app.route('/api/v1/user/thumbnail').post(uploads.single('file'),userController.thumbnail) 

       //Restaurant autencation
       app.route('/api/v1/restaurant/create').post(restaurantController.create); 
       app.route('/api/v1/restaurant/update').put(restaurantController.update); 
       app.route('/api/v1/restaurant/thumbnail').post(uploads.single('file'),restaurantController.thumbnail) 

        //Product
        app.route('/api/v1/product/create').post(productController.create); 
       app.route('/api/v1/product/update/:id').put(productController.update); 
       app.route('/api/v1/product/thumbnail/:id').post(uploads.single('file'),productController.thumbnail)
       
       //Orders

       app.route('/api/v1/order/').get(orderController.index); 
       app.route('/api/v1/order/:id').get(orderController.indexOne); 
       app.route('/api/v1/order/create').post(orderController.create); 
       app.route('/api/v1/order/update/:id').put(orderController.update); 
       
       



       // TODO apagar essas rotas 
       app.route('/api/v1/news').get(newsController.get); 
       app.route('/api/v1/news/:id').get(newsController.getById); 
       app.route('/api/v1/news').post(newsController.create); 
       app.route('/api/v1/news/:id').put(newsController.update); 
       app.route('/api/v1/news/:id').delete(newsController.delete); 
       


    }
  }

  export default new Routes();