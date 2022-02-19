"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const productSchema_1 = require("../models/productSchema");
exports.default = mongoose.model('products', productSchema_1.default);
