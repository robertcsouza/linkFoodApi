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
const HttpStatus = require("http-status");
const helper_1 = require("../config/helper");
//TODO update user 
// TODO upload image
class NewsController {
    constructor() {
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurants = yield restaurantService_1.default.get();
                helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, restaurants);
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
                const { name, freight, duration } = req.body;
                const userExist = yield restaurantService_1.default.getOne({ owner: user._id });
                if (userExist) {
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Usuário já possui um estabelecimento' });
                }
                const restaurant = {
                    name,
                    freight,
                    duration,
                    owner: user._id
                };
                yield restaurantService_1.default.create(restaurant);
                return helper_1.default.sendResponse(res, HttpStatus.OK, { msg: 'Restaurante criado com sucesso' });
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
                const restaurant = req.body;
                if (!user)
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'ação não pode ser realizada' });
                const restaurantExist = yield restaurantService_1.default.getOne({ owner: user._id });
                if (!restaurantExist)
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Estabelecimento nao encotrado' });
                yield restaurantService_1.default.update(restaurantExist._id, restaurant);
                return helper_1.default.sendResponse(res, HttpStatus.OK, { msg: 'Restaurante atualizado' });
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
                const restaurant = yield restaurantService_1.default.getOne({ owner: _id });
                if (!restaurant)
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Estabelecimento nao encotrado' });
                yield restaurantService_1.default.update(restaurant._id, { thumbnail: `http://localhost:3050/files/${filename}` });
                helper_1.default.sendResponse(res, HttpStatus.OK, { msg: `http://localhost:3050/files/${filename}` });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new NewsController();
