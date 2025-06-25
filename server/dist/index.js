"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const conn_1 = __importDefault(require("./db/conn"));
const dotenv = require("dotenv");
//Starting express server
const app = (0, express_1.default)();
dotenv.config();
(0, conn_1.default)();
const port = process.env.PORT || 3015;
app.get('/', (req, res) => {
    res.send('Hello, Welcome from YBS App');
});
app.listen(port, () => {
    console.log(chalk_1.default.green(`Server is running on port ${port}`));
});
