const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    const task = await Task.find();
    res.json(task);
});

//Ruta para obtener un usuario en específico
router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

//Ruta para crear un usuario
router.post('/', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json({
        status: "Task Saved"
    })
});

//Ruta para editar un usuario
router.put('/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "Task Updated"  
    });
});

//Ruta para eliminar un usuario
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id, req.body);
    res.json({
        status: "Task deleted"
    })
})

//Lo exporta para ser utilizado fuera
module.exports = router;