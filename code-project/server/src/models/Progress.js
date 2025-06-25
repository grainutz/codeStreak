"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const dailyProgressSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    lessonsCompleted: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 },
    xpEarned: { type: Number, default: 0 }
});
const achievementSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    unlockedAt: { type: Date, required: true },
    type: {
        type: String,
        enum: ['streak', 'lessons', 'xp', 'time'],
        required: true
    }
});
const progressSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    language: {
        type: String,
        required: true,
        default: 'JavaScript'
    },
    currentStreak: {
        type: Number,
        default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    },
    totalLessonsCompleted: {
        type: Number,
        default: 0
    },
    totalXP: {
        type: Number,
        default: 0
    },
    totalTimeSpent: {
        type: Number,
        default: 0
    },
    weeklyProgress: [dailyProgressSchema],
    achievements: [achievementSchema],
    currentLevel: {
        type: Number,
        default: 1
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// Create compound index for user and language
progressSchema.index({ userId: 1, language: 1 }, { unique: true });
exports.default = mongoose_1.default.model('Progress', progressSchema);
