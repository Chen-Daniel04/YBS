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
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = __importDefault(require("../models/admin"));
const conn_1 = __importDefault(require("../db/conn"));
const dotenv = require("dotenv");
dotenv.config();
// Connect to database
(0, conn_1.default)();
// Admin data
const adminData = {
    name: 'PYI HEIN AUNG',
    email: 'pyiheinaung92@gmail.com',
    password: 'DanielHein04'
};
// Seed function
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if admin already exists
        const existingAdmin = yield admin_1.default.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }
        // Hash password
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(adminData.password, saltRounds);
        // Create admin user
        const admin = new admin_1.default({
            name: adminData.name,
            email: adminData.email,
            password: hashedPassword
        });
        yield admin.save();
        console.log('Admin user created successfully');
        console.log('Email:', adminData.email);
        console.log('Password:', adminData.password);
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
});
// Run seeder
seedAdmin();
