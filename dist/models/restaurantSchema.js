"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
    name: { type: String },
    freight: { type: Number },
    duration: { type: String },
    thumbnail: { type: String },
    rating: { type: Number },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});
exports.default = restaurantSchema;
