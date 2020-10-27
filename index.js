const express = require('express')
const app = express()
const mongoose = require('mongoose');
const config = require('./config/database')
const path = require('path')
const router = require('express').Router();
const authentication = require('./routes/authentication')(router)
const bodyParser = require('body-parser')
var cors = require('cors')

//DataBase
// Pour éviter tout les  deprecation warnings de mongoose :
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

//Middelwares 

// CORS Doc
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
  }
app.use(cors(corsOptions))
//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Static folder
app.use(express.static(__dirname + '/client/dist'));
// authetication route
app.use('/authentication', authentication);
// CORS OpenClassRoom
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });



//Routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'))
});





// Server
const port = 8080
app.listen(port, () => console.log(`Server listening on port ${port}!`))