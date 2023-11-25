const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const db = require('./config/db');
const methodOverride = require('method-override');

// Connect to DB
db.connect();

const port = 3000;

const route = require('./routes/index');
app.use(express.static(path.join(__dirname, 'public')));

//MIDDLEWARE form html
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//MIDDLEWARE js
app.use(express.json());

//method-override
app.use(methodOverride('_method'));
//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resourse/views'));

route(app);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`),
);
