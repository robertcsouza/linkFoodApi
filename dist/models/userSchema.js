"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    thumbnail: { type: String },
    isAdmin: { type: Boolean }
});
exports.default = userSchema;
