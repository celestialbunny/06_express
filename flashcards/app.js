// Calling out express
const express = require('express');
const bodyParser  = require('body-parser');
const cookieParser = require('cookie-parser');

// Default way to set up express as 'app" will be the main program
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Setting the "template" using pug
app.set('view engine', 'pug');

// importing the available "routes"
const mainRoutes = require('./routes/index');
const cardRoutes = require('./routes/cards');
app.use(mainRoutes);
app.use('/cards', cardRoutes);

// creating custom error page
app.use((request, response, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// handling errors
app.use((error, request, response, next) => {
    response.locals.error = error;
    response.status(error.status);
    response.render('error', error);
});

/**
 * Allowing app to be run under port 3000
 * Display a message to know that it6 is running on background if successful
 */
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});