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
const orderRepository_1 = require("../repository/orderRepository");
class OrderService {
    constructor() {
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderRepository_1.default.find(options);
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderRepository_1.default.findById(_id);
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderRepository_1.default.create(order);
        });
    }
    update(_id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderRepository_1.default.findByIdAndUpdate({ _id: _id }, order);
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orderRepository_1.default.findByIdAndRemove(_id);
        });
    }
}
exports.default = new OrderService();
