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
const bannerService_1 = require("../services/bannerService");
const HttpStatus = require("http-status");
const helper_1 = require("../config/helper");
class BannerController {
    constructor() {
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const banners = yield bannerService_1.default.get();
                helper_1.default.sendResponse(res, HttpStatus.OK, banners);
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
                const { filename } = req.file;
                yield bannerService_1.default.create({ url: `http://localhost:3050/files/${filename}` });
                helper_1.default.sendResponse(res, HttpStatus.OK, { msg: `http://localhost:3050/files/${filename}` });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new BannerController();
