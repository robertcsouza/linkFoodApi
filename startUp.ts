import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import Db from './infra/db';
import newsController from './controller/newsController';
import auth from './infra/auth';
import createToken from './infra/createToken';
import uploads from './infra/uploads';
class StartUp {

    public app:express.Application
    private _db:Db;
    private bodyParser;
    constructor() {
        this.app = express();
        this._db = new Db;
        this._db.createConnection();
        this.middler();
        createToken.cToken();
        this.routes();
    }

    enableCors(){
        const options:cors.CorsOptions ={
            methods:"GET,OPTIONS,PUT,POST,DELETE",
            origin:"*"
        }

        this.app.use(cors(options))
    }

    middler(){
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}))
    }

    routes(){
        
        
        
        this.app.route('/').get((req,res)=>{
            res.send({version:'0.0.1'});
        });

        this.app.route('/uploads').post(uploads.single('file'),(req,res)=>{
            try {
                res.send("arquivo enviado com sucesso!");
            } catch (error) {
                console.log(error);  
            }
        })

       this.app.use(auth.validate) 
       this.app.route('/api/v1/news').get(newsController.get); 
       this.app.route('/api/v1/news/:id').get(newsController.getById); 
       this.app.route('/api/v1/news').post(newsController.create); 
       this.app.route('/api/v1/news/:id').put(newsController.update); 
       this.app.route('/api/v1/news/:id').delete(newsController.delete); 

    }

    



}

export default new StartUp();