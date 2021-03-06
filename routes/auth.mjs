import bodyParser from 'body-parser';
import urlencoded from 'urlencode';
import alertMessage from 'flash-messenger';
import bcrypt from 'bcryptjs';
import Passport from 'passport';
import Hash from 'hash.js';
import { response, Router } from 'express';
import nodemailer from '			nodemailer';
import twilio from 'twilio';



import { ModelUser } from '../data/user.mjs';

const router = Router();
export default router;

router.get("/login", login_page);
router.post("/login", login_process);
router.get("/register", register_page);
router.get("/register/verifyNumber", verifyNumber_page);
router.post("/register", register_process);
router.get("/logout", logout_process);


/**
 * 
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function login_page(req, res) {

	console.log("Login page accessed");

	return res.render('auth/login.html', {
		success: req.query.success,
		login_failed: req.query.invalid
	}
	);
}


/**
 * 
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */

async function login_process(req, res, next) {
	console.log("Incoming Request");
	console.log(req.body);

	return Passport.authenticate('local', {
		successRedirect: "/",
		failureRedirect: "/auth/login?invalid=true",
	})(req, res, next);

}

/**
 * 
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function register_page(req, res) {
	console.log("Register page accessed");
	return res.render('auth/register.html');
}

/**
 * 
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function verifyNumber_page(req, res) {
	return res.render('auth/verifyNumber.html');
}


/**
 * 
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
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
						ModelUser.create({ username: req.body.username, email: req.body.email, password: Hash.sha256().update(req.body.password).digest("hex"), verification_hash: Hash.sha256().update(req.body.email).digest("hex"), phoneNumber: req.body.number, address: req.body.address, phoneNumber_pin: Math.random().toString().substr(2, 4) })
							.then(user => {



								// Sends number verification


								// const accountSID = 'AC1c886159e90de587c54a161fcbb7050d'
								// const authToken = '82140205eacb0eb8784894a03bf7bd92'
								// const twilioNumber = '+17634529124'


								// let client = new twilio(accountSID, authToken)

								// client.messages 
								// 	  .create({ 
								// 		 body: 'Dear Customer, Your OTP for Breadington is ' + user.phoneNumber_pin + '. Use this Passcode to verify your phone number. Thank you.',  
								// 		 messagingServiceSid: 'MG0d160ce6e5c9c06e5a148e1d983ab07b',      
								// 		 to: '+6593597922' 
								// 	   }) 
								// 	  .then(message => console.log(message.sid)) 
								// 	  .done();


								// Sends email

								// create reusable transporter object using the default SMTP transport
								let transporter = nodemailer.createTransport({
									host: "smtp-mail.outlook.com", // hostname
									secureConnection: false, // TLS requires secureConnection to be false
									port: 587,
									secure: false, // true for 465, false for other ports
									auth: {
										user: "breadington.official@outlook.com", // generated ethereal user
										pass: "Suckmybre@d", // generated ethereal password
									},
									tls: {
										ciphers: 'SSLv3'
									}
								});

								// send mail with defined transport object
								transporter.sendMail({
									from: '"Fred Foo ????" breadington.official@outlook.com', // sender address
									to: "ktykuang@gmail.com", // list of receivers
									subject: "Hello ??? Verification", // Subject line
									text: "Please click on this link: http://localhost:3000/" + test, // plain text body
									html: "<b>Thank you for your registration, please verify here:</b> http://localhost:3000/confirmEmail?id=" + test, // html body
								});

								console.log("Message sent");
								return res.redirect('login/?success=true')
							})
							.catch(err => console.log(err));

					}
				});

		});

}



/**
 * Logs out the current user
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function logout_process(req, res) {
	req.logout();
	return res.redirect("login");
}
