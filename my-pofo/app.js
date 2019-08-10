const express = require('express');
const mongoose = require('mongoose');
const validator = require('express-validator');
const hbs = require('hbs');
const session = require('express-session');
const indexRoutes = require('./routes/index');
const projectRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');
const errorHandlers = require('./middlewares/error-handlers');
const appMiddleware = require('./middlewares/app-middleware')

const app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mypofo',{useNewUrlParser:true})
    .then(
    success => console.log('Successfully connected with DB'))
    .catch(err => console.log('Unable to connect'))

mongoose.set('useCreateIndex', true);

//  middlewares

app.use(session({
    secret:'myappsecret',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 60000}
}));

// app.use(validator());

app.use(express.static(__dirname+'/static'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));




app.use(appMiddleware.authenticated);
app.use(appMiddleware.logger);



app.use('/', indexRoutes);

app.use('/projects', projectRoutes);

app.use('/admin',appMiddleware.authenticate, adminRoutes);

app.use(errorHandlers.notFound);

app.use(errorHandlers.handleError);

app.listen(3000, () => console.log('Server up n running on port 3000'))