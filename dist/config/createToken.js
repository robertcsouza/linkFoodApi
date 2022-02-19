"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const configs = require("./configs");
class CreateToken {
    constructor() {
    }
    cToken() {
        let payload = {
            iss: "teste@teste.com",
            iat: new Date().getSeconds(),
            exp: new Date().setMinutes(60),
            name: "Roberto c",
            email: "robert@teste.com"
        };
        var token = jwt.sign(payload, configs.default.secret);
        console.log(token);
    }
}
exports.default = new CreateToken();
