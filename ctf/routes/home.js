var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.loggedin) {
        res.render('home', { title: 'Home' , user: req.session.username});
    } else {
        res.render('home', { title: 'Home'});
    }
});

module.exports = router;
