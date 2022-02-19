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
const productsService_1 = require("../services/productsService");
const HttpStatus = require("http-status");
const helper_1 = require("../config/helper");
class OrderController {
    constructor() {
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const restaurant = yield restaurantService_1.default.getOne({ _id: id });
                if (!restaurant)
                    helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'restaurante nao encomtrado' });
                const products = yield productsService_1.default.getById(restaurant._id);
                helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, products);
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
                const { name, price, description } = req.body;
                const userExist = yield restaurantService_1.default.getOne({ owner: user._id });
                if (!userExist) {
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Restaurante nao encontrado' });
                }
                const product = {
                    name,
                    price,
                    description,
                    restaurant: userExist._id
                };
                const productResult = yield productsService_1.default.create(product);
                return helper_1.default.sendResponse(res, HttpStatus.OK, productResult);
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
                const product = req.body;
                const { id } = req.params;
                if (!user)
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'ação não pode ser realizada' });
                const userExist = yield restaurantService_1.default.getOne({ owner: user._id });
                if (!userExist) {
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Restaurante nao encontrado' });
                }
                yield productsService_1.default.update(id, product);
                return helper_1.default.sendResponse(res, HttpStatus.OK, { msg: 'produto atualizado' });
            }
            catch (error) {
                console.log(`Error ${error}`);
                return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });
            }
        });
    }
    thumbnail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.user;
                const { filename } = req.file;
                const { id } = req.params;
                const restaurant = yield restaurantService_1.default.getOne({ owner: _id });
                if (!restaurant)
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Estabelecimento nao encotrado' });
                yield productsService_1.default.update(id, { thumbnail: `http://localhost:3050/files/${filename}` });
                helper_1.default.sendResponse(res, HttpStatus.OK, { msg: `http://localhost:3050/files/${filename}` });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new OrderController();
