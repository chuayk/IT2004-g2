import bodyParser from 'body-parser';
import { response, Router } from 'express';
import urlencoded from 'urlencode';
import alertMessage from 'flash-messenger';



const router = Router();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
export default router;
// const { validationResult } = require('express-validator');
// const urlencodedParser = bodyParser.urlencoded({ extended: false })


// How the fuck to import messanging stupid module

router.get("/login",      async function(req, res) {
	console.log("Login page accessed");
	return res.render('auth/login.html');
});

router.get("/register", async function(req, res) {
	console.log("Register page accessed");
	return res.render('auth/register.html');
})

router.post("/login", async function(req, res) {
	console.log("Home page accessed");
	return res.render('home.html', {
	});
});


router.post('/register', (req, res) => {
	if (req.body.password.length < 4){
		return res.send('Password must be at least 4 characters')
	}
	else if(req.body.password != req.body.password2){
		// alertMessage(res, 'danger',
		// 'Passwords do not match', 'fas fa-exclamation-circle', false);
		return res.send('Passwords do not match')

	}
	else {
		// alertMessage(res, 'success',
		//  `${req.body.email} registered successfully`, 'fas fa-sign-in-alt', true);
		return res.send(`${req.body.email} registered successfully`)

	}

	res.render('user/register') 
});