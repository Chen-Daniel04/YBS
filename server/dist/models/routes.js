"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const StopSchema = new mongoose.Schema({
    stopName: { type: String, required: true },
    stopCode: { type: String, unique: true, sparse: true },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
    },
    order: { type: Number, required: true },
}, { _id: true });
const RouteSchema = new mongoose.Schema({
    routeName: { type: String, required: true, unique: true },
    routeNumber: { type: String, required: true, unique: true },
    startPoint: { type: String },
    endPoint: { type: String },
    stops: [StopSchema],
    operatingHours: {
        start: { type: String },
        end: { type: String },
    },
}, {
    timestamps: true,
});
const Route = mongoose.model("Route", RouteSchema);
exports.default = Route;
