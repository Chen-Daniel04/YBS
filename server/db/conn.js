"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoURL = process.env.mongoURL;
        if (!mongoURL) {
            throw new Error('Database URL is not defined correctly');
        }
        yield mongoose_1.default.connect(mongoURL);
        console.log(chalk_1.default.green('MongoDB Connected Successfully!'));
    }
    catch (error) {
        console.error(chalk_1.default.red(`MongoDB connection error: ${error.message}`));
    }
});
exports.default = connectDB;
