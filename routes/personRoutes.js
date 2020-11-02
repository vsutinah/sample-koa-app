const Router = require('koa-router'),
    router = new Router(),
    Person = require('../models/person');

// List of people
const index = async (ctx) => {
    const users = await Person.find();
    await ctx.render('index', {
        title: 'List of People', users
    });
}

// Show addName page
const showName = async (ctx) => {
    await ctx.render('show');
}

// Add new name
const addName = async (ctx) => {
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

// Routes
router.get('/name', index)
    .get('/name/new', showName)
    .post('/name', addName);

module.exports = router;