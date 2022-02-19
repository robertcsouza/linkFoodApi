"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const bannerSchema_1 = require("../models/bannerSchema");
exports.default = mongoose.model('banners', bannerSchema_1.default);
