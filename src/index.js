const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/mevn-database') //Conexión a la base de datos
    .then(db => console.log('La base de datos está conectada')) //Mensaje que indica que la db se conecto con éxito
    .catch(err => console.err(err));   //Mensaje que indica si existe un error de conexión

//Configuraciones y puerto
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tasks', require('./routes/tasks'));

//Archivos staticos
app.use(express.static(__dirname + '/public'));

//Conexión del servidor
app.listen(app.get('port'), () => {
    console.log('El servidor funciona en el puerto', app.get('port'));
});






