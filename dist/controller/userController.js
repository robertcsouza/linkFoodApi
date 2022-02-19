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
const userService_1 = require("../services/userService");
const jwt = require("jsonwebtoken");
const HttpStatus = require("http-status");
const hash = require("md5");
const helper_1 = require("../config/helper");
const configs_1 = require("../config/configs");
//TODO update user 
// TODO upload image
class NewsController {
    constructor() {
    }
    session(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const hashPassword = hash(password);
                const options = { email, password: hashPassword };
                const user = yield userService_1.default.getOne(options);
                if (!user) {
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Usuário não encontrado' });
                }
                const payload = {
                    "_id": user._id,
                    "name": user.name,
                    "email": user.email,
                    "isAdmin": user.isAdmin
                };
                var token = jwt.sign(payload, configs_1.default.secret);
                return helper_1.default.sendResponse(res, HttpStatus.OK, {
                    token: token,
                });
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
                const { email, password, passwordConfirm, name, isAdmin } = req.body;
                if (password !== passwordConfirm) {
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'As senhas nao são iguais' });
                }
                const hashPassword = hash(password);
                const user = yield userService_1.default.getOne({ email });
                if (user) {
                    return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Usuário existente' });
                }
                yield userService_1.default.create({ name, email, password: hashPassword, isAdmin });
                return helper_1.default.sendResponse(res, HttpStatus.OK, { msg: 'Usuário criado com sucesso' });
            }
            catch (error) {
                console.log(`Error ${error}`);
                return helper_1.default.sendResponse(res, HttpStatus.UNAUTHORIZED, { msg: 'Error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.user);
        });
    }
    thumbnail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filename } = req.file;
                return helper_1.default.sendResponse(res, HttpStatus.OK, { msg: `http://localhost:3050/files/${filename}` });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new NewsController();
