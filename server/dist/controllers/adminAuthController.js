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
exports.getAdminProfile = exports.logoutAdmin = exports.loginAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = __importDefault(require("../models/admin"));
// Generate JWT token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};
// Login Admin
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password required' });
        return;
    }
    const admin = yield admin_1.default.findOne({ email }).select('+password');
    if (!admin || !(yield admin.comparePassword(password))) {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        return;
    }
    const token = generateToken(admin._id);
    const { _id, name } = admin;
    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
            admin: { _id, name, email },
            token
        },
    });
});
exports.loginAdmin = loginAdmin;
// Logout Admin
const logoutAdmin = (req, res) => {
    res.status(200).json({ success: true, message: 'Logout successful' });
};
exports.logoutAdmin = logoutAdmin;
// Get Admin Profile
const getAdminProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const admin = yield admin_1.default.findById((_a = req.admin) === null || _a === void 0 ? void 0 : _a._id).select('-password');
    if (!admin) {
        res.status(404).json({ success: false, message: 'Admin not found' });
        return;
    }
    res.status(200).json({
        success: true,
        data: { admin },
    });
});
exports.getAdminProfile = getAdminProfile;
