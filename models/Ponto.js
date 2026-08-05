
const mongoose = require("mongoose");

const pontoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },

    emServico: {
        type: Boolean,
        default: false
    },

    entrada: {
        type: Date,
        default: null
    },

    tempoTotal: {
        type: Number,
        default: 0
    },

    pontosBatidos: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Ponto", pontoSchema);
