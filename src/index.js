const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/mevn-database')
    .then(db => console.log('La base de datos está conectada'))
    .catch(err => console.err(err));

//Settings
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tasks', require('./routes/tasks'));

//static files
app.use(express.static(__dirname + '/public'));

//El servidor escucha en
app.listen(app.get('port'), () => {
    console.log('El servidor funciona en el puerto', app.get('port'));
});






