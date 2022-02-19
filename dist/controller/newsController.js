"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = require("../services/newsService");
const HttpStatus = require("http-status");
const helper_1 = require("../config/helper");
class NewsController {
    constructor() {
    }
    get(req, res) {
        newsService_1.default.get().then((news => helper_1.default.sendResponse(res, HttpStatus.OK, news))).catch(error => console.error.bind(console, `Error ${error}`));
    }
    getById(req, res) {
        const _id = req.params.id;
        newsService_1.default.getById(_id).then((news => helper_1.default.sendResponse(res, HttpStatus.OK, news))).catch(error => console.error.bind(console, `Error ${error}`));
    }
    create(req, res) {
        let vm = req.body;
        newsService_1.default.create(vm).then((news => helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia cadastrada com sucesso"))).catch(error => console.error.bind(console, `Error ${error}`));
    }
    update(req, res) {
        const _id = req.params.id;
        let vm = req.body;
        newsService_1.default.update(_id, vm).then((news => helper_1.default.sendResponse(res, HttpStatus.OK, `${news.title} foi atualizada com sucesso`))).catch(error => console.error.bind(console, `Error ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        newsService_1.default.delete(_id).then((news => helper_1.default.sendResponse(res, HttpStatus.OK, `Notícia foi deletada com sucesso`))).catch(error => console.error.bind(console, `Error ${error}`));
    }
}
exports.default = new NewsController();
