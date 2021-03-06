import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import Db from './config/db';
import * as routes from './config/routes';
import * as path from 'path'

class StartUp {

    public app:express.Application
    private _db:Db;
    private bodyParser;
    constructor() {
        this.app = express();
        this._db = new Db;
        this._db.createConnection();
        this.middler();
        routes.default.routes(this.app);
    }

    enableCors(){
        const options:cors.CorsOptions ={
            methods:"GET,OPTIONS,PUT,POST,DELETE",
            origin:"*"
        }

        this.app.use(cors(options))
        this.app.use(
            '/files',
            express.static(path.resolve(__dirname,'..','uploads'))
        );
    }

    middler(){
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false}))
    }


    



}

export default new StartUp();