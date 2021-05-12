import bodyParser from 'body-parser';
import { response, Router } from 'express';
import urlencoded from 'urlencode';
import alertMessage from 'flash-messenger';
import user from '../data/models.mjs';
import bcrypt from 'bcryptjs';
import passport from 'passport';



const router = Router();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
export default router;
// const { validationResult } = require('express-validator');
// const urlencodedParser = bodyParser.urlencoded({ extended: false })



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

import {test} from '../data/user.mjs';


router.post('/register', (req, res) => {
	let {username, email, password, password2} = req.body;
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
		// return res.send(`${req.body.email} registered successfully`)
		test.findOne({ where: {email: req.body.email} })
		.then(user => {
		if (user) {
			console.log("already registered.")
			res.render('auth/register.html')
			// res.render('/register', {
			// 	// error: user.email + ' already registered'
			// 	username,
			// 	email,
			// 	password,
			// 	password2
			// 	});
				}
		else{
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				console.log(hash);
				password = hash;	
				test.create({username: req.body.username , email: req.body.email, password: password})
				.then(user => {
				alertMessage(res, 'success', user.name + ' added. Please login', 'fas fa-sign-in-alt', true);

				})
				.catch(err => console.log(err));
			});
		});
		return res.redirect('login')

		
	}
	});
	}

});