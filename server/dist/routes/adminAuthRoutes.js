"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = require("../controllers/adminAuthController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Public routes
router.post('/login', adminAuthController_1.loginAdmin);
// Protected routes
router.post('/logout', authMiddleware_1.protect, adminAuthController_1.logoutAdmin);
router.get('/profile', authMiddleware_1.protect, adminAuthController_1.getAdminProfile);
exports.default = router;
