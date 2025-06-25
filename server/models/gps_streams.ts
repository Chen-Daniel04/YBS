const mongoose = require('mongoose');

const GPSStreamSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        index: true
    },
    bus: {
        type: mongoose.Scehma.Types.ObjectId,
        ref: 'Bus',
        required: true,
        index: true
    },

    // --- Geographic Data ---
    location: {
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

    // --- Timestamp of Report ---
    timestamp: {
        type: Date,
        required: true,
        default: Date.now,
        index: true
    }
}, {
    timestamps: false
});

const GPSStream = mongoose.model('GPSStream', GPSStreamSchema);
export default GPSStream;