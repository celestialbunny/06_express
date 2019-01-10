const express = require('express');
const router = express.Router();

/**
 * Setting all the different views via possible routes "/"
 * response.send is meant for direct messages
 *      WHEREAS
 * res.render is to return a specific template
 */
router.get('/', (request, response) => {
    // response.send('<h1>I love Treehouse</h1>');
    const name = request.cookies.username;
    if(name) {
        response.render('index', {name: name});
    } else {
        response.redirect('hello');
    }
});

/**
 * Redirect to 'hello' route
 */
router.get('/hello', (request, response) => {
    // as this website provides cookies to store information, user can access them annytime
    // however, if cookie is deleted, user will be redirected to re-enter info due to "blank" profile
    const name = request.cookies.username;
    if (name) {
        response.redirect('/');
    } else {
        response.render('hello');
    }
});
router.post('/hello', (request, response) => {
    // using '.json' to capture the data to be captured to test results
    // response.json(request.body);

    response.cookie('username', request.body.username);
    response.redirect('/');
});

/**
 * Redirect to 'goodbye' route
 */
router.post('/goodbye', (request, response) => {
    response.clearCookie('username');
    response.redirect('/hello');
});

// Setting up middleware
router.use((request, response, next) => {
    console.log('Hello');
    const error = new Error('Oh noes!');
    error.status = 500;
    next(error);
});

module.exports = router;