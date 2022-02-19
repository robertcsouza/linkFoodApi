"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    constructor() {
        this.sendResponse = function (res, statuscode, data) {
            res.status(statuscode).json({ result: data });
        };
    }
}
exports.default = new Helper();
