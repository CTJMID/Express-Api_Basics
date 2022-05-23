const express = require('express');
const app = express();
const Joi = require('joi')

app.use(express.json());

const courses = [
    { id: 1, name: 'maths'},
    { id: 2, name: 'french'},
    { id: 3, name: 'history'}
]

app.get('/', (req, res) => {
    res.send('Hello World!!!')
});

app.get('/api/courses', (req, res) => {
    res.send([1,2,3]);
});

app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.query )
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found');
    res.send(course);
})

app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found');

    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    course.name = req.bodu.name;
    res.send(course)

})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))