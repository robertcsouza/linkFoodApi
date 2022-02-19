"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const restaurantSchema_1 = require("../models/restaurantSchema");
exports.default = mongoose.model('restaurants', restaurantSchema_1.default);
