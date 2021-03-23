const mongoose = require('mongoose');
const { Schema } = mongoose;



// const addressSchema = new mongoose.Schema({
    //     calle: {
    //       type: String,
    //       require: true
    //     },
    //     edificio: {
    //       type: Number,
    //       require: true
    //     },
    //     piso: {
    //       type: Number,
    //       require: true
    //     }
    //   },{
    //     timestamps: true
    // })

const infoPersonalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    trabajo: {
        type: Boolean,
        required: true
    },
    comida: [
        {
        type: String, 
        required: true,
        enum: ['arroz', 'pollo', 'tomate']
        }
    ],
    //direccion: [addressSchema],
    Date: {
        type: Date,
        required: true,
        default: Date.now
    }
    })
      

module.exports = mongoose.model('infoPersonal', infoPersonalSchema);