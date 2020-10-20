const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

// response to GET requests
router.get('/', async (ctx) => {
    ctx.body = 'Hello world\n';
})

// Logging
app.use(Logger());

// Add routes and response to the OPTIONS requests
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Server running on port 3000');
});