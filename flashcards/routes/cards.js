const express = require('express');
const router = express.Router();

// Since this is already under the '/cards' route path, the '/cards' can be omitted
// router.get('/cards', (request, response) => {
router.get('/', (request, response) => {
    response.render('card', {
        prompt: "Who is buried in Grant's tomb?",
        // hint: "Think about whose tomb it is."
    });
});

module.exports = router;