const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5445;
var path = require('path');
global.APP_ROOT = path.resolve(__dirname);

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use(cors());
app.set('public', './public')
app.set('view engine', 'pug');
require('./js/routes')(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
})