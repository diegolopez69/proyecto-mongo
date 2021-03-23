const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new mongoose.Schema({
        calle: {
          type: String,
          require: true
        },
        edificio: {
          type: Number,
          require: true
        },
        piso: {
          type: Number,
          require: true
        }
      },{
        timestamps: true
    });

const infoPersonalSchema = new mongoose.Schema({
    nombre: {
        type: String,   //Defino el tipo de dato que será
        required: true  //Defino si es opcional o no
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
        required: false,
        enum: ['arroz', 'pollo', 'tomate', '']  //Opciones fijas que pueden estar o no dentro del campo
        }
    ],
    direccion: [addressSchema], //LLamo a el esquema de arriba
    Date: {
        type: Date,
        required: true,
        default: Date.now
    }
    })
      

module.exports = mongoose.model('infoPersonal', infoPersonalSchema);
                            //Nombre de la coleccion    Nombre del esquema