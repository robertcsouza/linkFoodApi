"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db_1 = require("./config/db");
const routes = require("./config/routes");
const path = require("path");
class StartUp {
    constructor() {
        this.app = express();
        this._db = new db_1.default;
        this._db.createConnection();
        this.middler();
        routes.default.routes(this.app);
    }
    enableCors() {
        const options = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        };
        this.app.use(cors(options));
        this.app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
    }
    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new StartUp();
