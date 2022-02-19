 import * as  mongoose from 'mongoose';

 class Db {
     constructor() {
         
     }

    private DB_URL = 'mongodb+srv://devhosue:linkapi@cluster0.2auu3.mongodb.net/linkapi?retryWrites=true&w=majority'

    createConnection(){
        mongoose.connect(this.DB_URL);
    }

 }

 export default Db;