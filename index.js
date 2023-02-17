const config = require('config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const db = config.get('db')


const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users')
const auth = require('./routes/auth')

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR : jwtPrivateKey is not defined')
    process.exit(1);
}

mongoose.connect(db)
.then( () => console.log(`Mongo DB is connected to ${db}`))
.catch(err => console.error('DB is not connected'))



app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth); // auth or login


const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Connected to ${port} ...`));

module.exports = server;