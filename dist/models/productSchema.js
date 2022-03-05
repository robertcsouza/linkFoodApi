"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    description: { type: String },
    thumbnail: { type: String },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants'
    }
});
exports.default = productSchema;
