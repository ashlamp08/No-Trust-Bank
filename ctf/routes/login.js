var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'ctf',
	password : 'ctf',
    database : 'ctf',
    port: '3306'
});

/* GET login page. */
router.get('/', function(req, res, next) {
    if(req.session.error){
        delete req.session.error;
        res.render('login', { title: 'Login' , error: "Incorrect username or password"});  
    } else if(req.session.loggedin){
        res.render('login', { title: 'Login' , loggedin: true});
    } else {
        res.render('login', { title: 'Login' });
    }
});

/* Logout. */
router.get('/logout', function(req, res, next) {
    if(req.session.loggedin){
        delete req.session.error;
        delete req.session.loggedin;
        delete req.session.username;
        res.redirect('/login');  
    }
});

router.post('/auth', function(request, response) {
	var username = request.body.username;
    var password = request.body.password;
    console.log(username);
    console.log(password);
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            console.log(error);
            if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
                request.session.error = 'Incorrect username or password';
				response.redirect('/login');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

module.exports = router;
