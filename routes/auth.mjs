import bodyParser from 'body-parser';
import urlencoded from 'urlencode';
import alertMessage from 'flash-messenger';
import user from '../data/models.mjs';
import bcrypt from 'bcryptjs';
import Passport from 'passport';
import Hash from 'hash.js';
import { response, Router } from 'express';

import twilio from 'twilio';
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN).lookups.v1;

import { ModelUser } from '../data/user.mjs';

const router = Router();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
export default router;
// const { validationResult } = require('express-validator');
// const urlencodedParser = bodyParser.urlencoded({ extended: false })




router.get("/login", login_page);
router.post("/login", login_process);
router.get("/register", register_page);
router.post("/register", register_process);
router.get("/logout", logout_process);



async function login_page(req, res) {
	console.log("Login page accessed");
	return res.render('auth/login.html', {
		success: req.query.success,
		login_failed: req.query.invalid
	});
}



async function login_process(req, res, next) {
	console.log("Incoming Request");
	console.log(req.body);

	return Passport.authenticate('local', {
		successRedirect: "/",
		failureRedirect: "/auth/login?invalid=true",
	})(req, res, next);

}



async function register_page(req, res) {
	console.log("Register page accessed");
	return res.render('auth/register.html');
}

// Change

async function register_process(req, res) {

	let { username, email, password, password2, phoneNumber, address } = req.body;

	ModelUser.findOne({ where: { email: req.body.email } })
		.then(user => {
			if (user) {
				console.log("email already registered.")
				return res.render('auth/register.html', {
					registeredEmail: true,
				});
			}

			ModelUser.findOne({ where: { username: req.body.username } })
				.then(user => {
					if (user) {
						console.log("username already registered.")

						return res.render('auth/register.html', {
							registeredUsername: true,
						});
					}

					else {
						ModelUser.create({ username: req.body.username, email: req.body.email, password: Hash.sha256().update(req.body.password).digest("hex"), phoneNumber: req.body.number, address: req.body.address })
							.then(user => {
								// alertMessage(res, 'success', user.name + ' added. Please login', 'fas fa-sign-in-alt', true);
								return res.redirect('login/?success=true')
							})
							.catch(err => console.log(err));

					}
				});

		});

}


async function logout_process(req, res) {
	req.logout();
	return res.redirect("login");
}
