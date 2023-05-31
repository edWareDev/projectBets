import mongoose from 'mongoose';

export const schemaUsers = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    saldo: { type: Number, required: true },
    predictionsCorrects: { type: Number, required: false },
    predictionsIncorrects: { type: Number, required: false },
    matchs: { type: Object, required: true }
}, { versionKey: false })