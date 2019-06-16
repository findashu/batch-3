const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/index')
const errorHandlers = require('./middlewares/error-handlers');
const appMiddleware = require('./middlewares/app-middleware')

const app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials')

//  middlewares
app.use(express.static(__dirname+'/static'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.use(appMiddleware.logger);

app.get('/', routes.index);
app.get('/projects', routes.project);

app.get('/signin', routes.signin);
app.post('/signin', routes.doSignin);



app.get('/projects/:alias', routes.projectDetail);

app.use(errorHandlers.notFound);


app.use(errorHandlers.handleError);

app.listen(3000, () => console.log('Server up n running on port 3000'))