"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantService_1 = require("../services/restaurantService");
const orderService_1 = require("../services/orderService");
const HttpStatus = require("http-status");
const helper_1 = require("../config/helper");
class OrderController {
    constructor() {
    }
    /*
    
    total:{type:Number},
    obs:{type:String},
    status:{type:String},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
        },
    restaurants:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'restaurants'
        },

    products:{type:Array}
    
    */
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user)
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Não authorizado' });
                if (user.isAdmin) {
                    //retornar orders admin
                    const restaurant = yield restaurantService_1.default.getOne({ owner: user._id });
                    if (!restaurant)
                        return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'restaurante nao encomtrado' });
                    const orders = yield orderService_1.default.get({ restaurant: restaurant._id });
                    return helper_1.default.sendResponse(res, HttpStatus.OK, orders);
                }
                else {
                    //retornar order usuario
                    const orders = yield orderService_1.default.get({ user: user._id });
                    return helper_1.default.sendResponse(res, HttpStatus.OK, orders);
                }
            }
            catch (error) {
                console.log(`Error ${error}`);
                return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });
            }
        });
    }
    indexOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { id } = req.params;
                if (!user)
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Não authorizado' });
                if (user.isAdmin) {
                    //retornar orders admin
                    const restaurant = yield restaurantService_1.default.getOne({ owner: user._id });
                    if (!restaurant)
                        return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'restaurante nao encomtrado' });
                    const order = yield orderService_1.default.getById(id);
                    if (order.restaurants.toString() !== restaurant._id.toString())
                        return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Não autorizado' });
                    return helper_1.default.sendResponse(res, HttpStatus.OK, order);
                }
                else {
                    //retornar order usuario
                    const order = yield orderService_1.default.getById(id);
                    if (order.user.toString() !== user._id.toString())
                        return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Não autorizado' });
                    return helper_1.default.sendResponse(res, HttpStatus.OK, order);
                }
            }
            catch (error) {
                console.log(`Error ${error}`);
                return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user)
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'ação não pode ser realizada' });
                const { total, obs, status, products, restaurants } = req.body;
                const order = {
                    total,
                    obs,
                    status,
                    user: user._id,
                    restaurants,
                    products
                };
                const orderResult = yield orderService_1.default.create(order);
                return helper_1.default.sendResponse(res, HttpStatus.OK, orderResult);
            }
            catch (error) {
                console.log(`Error ${error}`);
                return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { id } = req.params;
                const { status } = req.body;
                if (!user)
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Não authorizado' });
                if (user.isAdmin) {
                    //retornar orders admin
                    const restaurant = yield restaurantService_1.default.getOne({ owner: user._id });
                    if (!restaurant)
                        return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'restaurante nao encomtrado' });
                    const order = yield orderService_1.default.getById(id);
                    if (!order)
                        return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'pedido não encontrado' });
                    yield orderService_1.default.update(id, { status });
                    return helper_1.default.sendResponse(res, HttpStatus.OK, { msg: 'Pedido atualizado' });
                }
            }
            catch (error) {
                console.log(`Error ${error}`);
                return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });
            }
        });
    }
}
exports.default = new OrderController();
