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
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const conn_1 = __importDefault(require("./db/conn"));
const adminAuthRoutes_1 = __importDefault(require("./routes/adminAuthRoutes"));
const dotenv = require("dotenv");
//Starting express server
const app = (0, express_1.default)();
dotenv.config();
// Connect to database with error handling
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, conn_1.default)();
        console.log(chalk_1.default.green('✓ Database connected successfully'));
        // Middleware
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        const port = process.env.PORT || 3015;
        // Routes
        app.get('/', (req, res) => {
            res.send('Hello, Welcome from YBS App');
        });
        // Admin Authentication Routes
        app.use('/api/admin', adminAuthRoutes_1.default);
        // Start server
        const server = app.listen(port, () => {
            console.log(chalk_1.default.green(`✓ Server is running on port ${port}`));
        });
        // Handle server errors
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.log(chalk_1.default.red(`✗ Port ${port} is already in use`));
                console.log(chalk_1.default.yellow('Please try a different port or stop the existing server'));
            }
            else {
                console.log(chalk_1.default.red('✗ Server error:', error.message));
            }
            process.exit(1);
        });
        // Handle server close
        server.on('close', () => {
            console.log(chalk_1.default.green('✓ Server closed'));
        });
    }
    catch (error) {
        console.log(chalk_1.default.red('✗ Failed to start server:'));
        console.log(chalk_1.default.red('Database connection failed or server initialization error'));
        console.log(chalk_1.default.red('Error details:', error));
        process.exit(1);
    }
});
// Start the server
startServer();
