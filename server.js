const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());


const forum = require('./forum');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/message', forum.getMessages);
app.post('/message', forum.addMessage);

app.listen(3000, () => console.log('App listening on port 3000!'));

module.exports = app;