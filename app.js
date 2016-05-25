var express = require('express');
var app = express();
var sql = require('mssql');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var config = {
    user: 'nv',
    password: 'abc123#',
    server: 'eastempireconstruction.com',
    database: 'BooksDb',
    options: {
        encrypt: true
    }
};

//sql.connect(config, function (err) {
//    console.log(err);
//});

var port = process.env.PORT || 5000;

var nav = [
    {
        Link: '/Books',
        Text: 'Books'
    }, {
        Link: '/Authors',
        Text: 'Authors'
    }];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
var sess = {
    secret: 'library',
    cookie: {}
};
app.use(session({
    secret: 'library',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (request, response) {
    response.render('index', {
        title: 'Hello from render',
        nav: [
            {
                Link: '/Books',
                Text: 'Books'
            }, {
                Link: '/Authors',
                Text: 'Authors'
            }
        ]
    });
});

app.get('/books', function (request, response) {
    response.send('Hello Books !');
});

app.listen(port, function (error) {
    console.log('running server on port ' + port);
});