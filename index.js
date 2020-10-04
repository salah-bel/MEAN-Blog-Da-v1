const express = require('express')
const app = express()
const mongoose = require('mongoose');
const config = require('./config/database')
const path = require('path')

//DataBase
// Pour éviter tout les  deprecation warnings :
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise = global.Promise;
//Connexion Uri
mongoose.connect(config.uri);       
// catch err ou succss
const db = mongoose.connection;         
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connexion succes to : ' + config.db)
});

// Static folder
app.use(express.static(__dirname + '/client/dist'));

//Routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'))
});





// Server
const port = 8080
app.listen(port, () => console.log(`Example app listening on port ${port}!`))