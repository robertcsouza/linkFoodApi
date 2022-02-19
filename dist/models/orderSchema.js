"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    total: { type: Number },
    obs: { type: String },
    status: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    restaurants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants'
    },
    products: { type: Array }
});
exports.default = orderSchema;
