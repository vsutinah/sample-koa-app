const Person = require('./models/person'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/koaApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connection open!')
})
.catch(err => {
    console.log('Error in connecting...')
    console.log(err)
});

const seedUsers = [
    {
        first_name: 'Vincent',
        last_name: 'Sutinah'
    },
    {
        first_name: 'John',
        last_name: 'Doe'
    },
    {
        first_name: 'John',
        last_name: 'Cena'
    }
];

Person.insertMany(seedUsers)
    .then(res => (console.log(res)))
    .catch(err => (console.log(err)));