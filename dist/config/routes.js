"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsController_1 = require("../controller/newsController");
const userController_1 = require("../controller/userController");
const restaurantController_1 = require("../controller/restaurantController");
const bannerController_1 = require("../controller/bannerController");
const auth_1 = require("../config/auth");
const uploads_1 = require("../config/uploads");
class Routes {
    routes(app) {
        app.route('/').get((req, res) => {
            res.send({ version: '0.0.1' });
        });
        app.route('/uploads').post(uploads_1.default.single('file'), (req, res) => {
            try {
                res.send("arquivo enviado com sucesso!");
            }
            catch (error) {
                console.log(error);
            }
        });
        //session Routes
        app.route('/api/v1/session').post(userController_1.default.session);
        //User Routes
        app.route('/api/v1/user/create').post(userController_1.default.create);
        //Restaurants index
        app.route('/api/v1/restaurant').get(restaurantController_1.default.index);
        //insert banner
        app.route('/api/v1/banner/thumbnail').post(uploads_1.default.single('file'), bannerController_1.default.thumbnail);
        app.route('/api/v1/banner').get(bannerController_1.default.index);
        app.use(auth_1.default.validate);
        //User with authentication 
        app.route('/api/v1/user/update').put(userController_1.default.update);
        app.route('/api/v1/user/thumbnail').post(uploads_1.default.single('file'), userController_1.default.thumbnail);
        //Restaurant autencation
        app.route('/api/v1/restaurant/create').post(restaurantController_1.default.create);
        app.route('/api/v1/restaurant/update').put(restaurantController_1.default.update);
        app.route('/api/v1/restaurant/thumbnail').post(uploads_1.default.single('file'), restaurantController_1.default.thumbnail);
        // TODO apagar essas rotas 
        app.route('/api/v1/news').get(newsController_1.default.get);
        app.route('/api/v1/news/:id').get(newsController_1.default.getById);
        app.route('/api/v1/news').post(newsController_1.default.create);
        app.route('/api/v1/news/:id').put(newsController_1.default.update);
        app.route('/api/v1/news/:id').delete(newsController_1.default.delete);
    }
}
exports.default = new Routes();
