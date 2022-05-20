const express = require('express');
const res = require('express/lib/response');
const app = express();

app.get('/', (request, response) => {
    res.send('Hello World')
});

app.listen(3000, () => console.log('Listening on port 3000'))