const Koa = require('koa'),
    Router = require('koa-router'),
    Logger = require('koa-logger'),
    json = require('koa-json'),
    path = require('path'),
    mongoose = require('mongoose'),
    render = require('koa-ejs'),
    bodyParser = require('koa-bodyparser'),
    personRouter = require('./routes/personRoutes');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/koaApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
     console.log('Connection open!')
})
.catch(err => {
     console.log('Error in connecting...')
     console.log(err)
});

const app = new Koa();
const router = new Router();

// Json prettier middleware
app.use(json());
// Body Parser middleware
app.use(bodyParser());

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'ejs',
    cache: false,
    debug: false
});

// Logging requests in console
app.use(Logger());

router.use(personRouter.routes());

// Router middleware
// Add routes and response to the OPTIONS requests
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server running on port 3000'));