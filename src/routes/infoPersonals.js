const express = require('express');
const router = express.Router();
const InfoPersonal = require('../models/infoPersonal');

//Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    const infoPersonal = await InfoPersonal.find();
    res.json(infoPersonal);
});

//Ruta para obtener un usuario en específico
router.get('/:id', async (req, res) => {
    const infoPersonal = await InfoPersonal.findById(req.params.id);
    res.json(infoPersonal);
});

//Ruta para crear un usuario
router.post('/', async (req, res) => {
    const infoPersonal = new InfoPersonal(req.body);
    await infoPersonal.save();
    res.json({
        status: "Usuario Guardado exitosamente"
    })
});

//Ruta para editar un usuario
router.put('/:id', async (req, res) => {
    await InfoPersonal.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "Usuario actualizado"  
    });
});

//Ruta para eliminar un usuario
router.delete('/:id', async (req, res) => {
    await InfoPersonal.findByIdAndDelete(req.params.id, req.body);
    res.json({
        status: "Usuario eliminado"
    })
})

//Lo exporta para ser utilizado fuera
module.exports = router;