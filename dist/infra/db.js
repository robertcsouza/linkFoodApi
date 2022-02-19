"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class Db {
    constructor() {
        this.DB_URL = 'mongodb+srv://devhosue:linkapi@cluster0.2auu3.mongodb.net/linkapi?retryWrites=true&w=majority';
    }
    createConnection() {
        mongoose.connect(this.DB_URL);
    }
}
exports.default = Db;
