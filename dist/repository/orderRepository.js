"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const orderSchema_1 = require("../models/orderSchema");
exports.default = mongoose.model('orders', orderSchema_1.default);
