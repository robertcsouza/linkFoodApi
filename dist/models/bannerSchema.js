"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
    url: { type: String },
});
exports.default = bannerSchema;
