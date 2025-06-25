"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const BusSchema = new mongoose.Schema({
    busId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
        required: true
    },
    currentPassengerCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    inferredLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        }
    },
    inferredCurrentStop: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    inferredNextStop: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    lastUpdateTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastReportedGpsAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});
const Bus = mongoose.model('Bus', BusSchema);
exports.default = Bus;
