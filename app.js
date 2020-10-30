const Koa = require('koa'),
    Router = require('koa-router'),
    Logger = require('koa-logger'),
    json = require('koa-json'),
    path = require('path'),
    mongoose = require('mongoose'),
    render = require('koa-ejs'),
    bodyParser = require('koa-bodyparser'),
    Person = require('./models/person');

// Placeholder array; replace with stuff fm Mongo DB
const things = ['Stuff 1', 'Stuff 2', 'Stuff 3'];

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

// Add additional properties to ctx
app.context.name = 'Vincent'; // Can access this through ctx.name 

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'ejs',
    cache: false,
    debug: false
});

// Routes
router.get('/name', index);
router.get('/name/new', showName);
router.post('/name', addName);

// List of people
async function index(ctx) {
    const users = await Person.find();
    await ctx.render('index', {
        title: 'List of People', users
    });
}

// Show addName page
async function showName(ctx) {
    await ctx.render('show');
}

// Add new name
async function addName(ctx) {
    const newPerson = new Person(ctx.request.body);
    await newPerson.save()
        .then(() => {
            ctx.body = {
                id: newPerson._id
            };
            console.log(ctx.body);
        })
        .catch((e) => {
            console.log(e);
        })
}

// Logging requests in console
app.use(Logger());

// Router middleware
// Add routes and response to the OPTIONS requests
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Server running on port 3000'));