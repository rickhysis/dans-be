const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { router } = require('./routers');

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', router);

const port = 3000;

app.listen(port);
console.log(`listening on http://localhost:${port}`);

module.exports = app
