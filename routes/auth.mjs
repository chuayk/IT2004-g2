import bodyParser 				from 'body-parser';
import urlencoded 				from 'urlencode';
import alertMessage 			from 'flash-messenger';
import user 					from '../data/models.mjs';
import bcrypt 					from 'bcryptjs';
import Passport 				from 'passport';
import Hash             		from 'hash.js';
import { response, Router } 	from 'express';



import {ModelUser} from '../data/user.mjs';

const router = Router();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
export default router;
// const { validationResult } = require('express-validator');
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get("/logout",    logout_process);


router.get("/login",      async function(req, res) {
	console.log("Login page accessed");
	// return res.render('auth/login.html');
	return res.render('auth/login.html', {
		param1: req.query.param1
	});
});


router.get("/register", async function(req, res) {
	console.log("Register page accessed");
	return res.render('auth/register.html');
})


// lack Successful login alert, but need password & cookies (session)



router.post("/login", async function(req, res, next) {
	console.log("Incoming Request");
	console.log(req.body);
	
	return Passport.authenticate('local', {
		successRedirect: "/",
		failureRedirect: "/auth/login",
		failureFlash:    true
	})(req, res, next);


	// ModelUser.findOne({ where: {email: req.body.email, password: Hash.sha256().update(req.body.password).digest("hex")} })
	// .then(user => {
	// if (user) {
	// 	console.log("Welcome back,", user.username)
	// 	// Need to change this. Currently passes the role through routes.
	// 	return res.redirect('/?logged_in=true&role=' + user.role)
	// }
	
	// else if (ModelUser.findOne({ where: {email: req.body.email} }))
	// {
	// 	console.log("Invalid email!")
	// 	return res.redirect('login')


	// }
	// else if (ModelUser.findOne({ where: {email: req.body.email} }) )
// 	else {
// 		// return res.redirect('login')
// 		return res.render('auth/login.html', {
// 			login_failed: true,
// 		});	}
// })
});



// If email already registered
// if username already registered
// Successful!

router.post('/register', (req, res) => {
	
	let {username, email, password, password2, phoneNumber, address} = req.body;
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
		ModelUser.findOne({ where: {email: req.body.email} })
		.then(user => {
		if (user) {
			console.log("email already registered.")
			return res.render('auth/register.html', {
				registeredEmail: true,
			});
				}

		ModelUser.findOne({ where: {username: req.body.username} })
		.then(user => {
			if (user) {
				console.log("username already registered.")

				return res.render('auth/register.html', {
					registeredUsername: true,
				});
			}
	
				
		else{
				ModelUser.create({username: req.body.username , email: req.body.email, password: Hash.sha256().update(req.body.password).digest("hex"), phoneNumber: req.body.number, address: req.body.address})
				.then(user => {
				// alertMessage(res, 'success', user.name + ' added. Please login', 'fas fa-sign-in-alt', true);
				return res.redirect('login/?param1=success')
				})
				.catch(err => console.log(err));
	
	}
	});

	});
	}

});


async function logout_process(req, res) {
	req.logout();
	return res.redirect("login");
}
