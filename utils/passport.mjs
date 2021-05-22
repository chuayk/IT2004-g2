import Passport from 'passport';
import { Strategy } from 'passport-local';
import Hash from 'hash.js';
import { ModelUser } from '../data/user.mjs';
import { response, Router } 	from 'express';


/**
 * Initialize the passport and configure local strategy
 * @param {import('express').Express} server 
 */

export function initialize_passport(server) {
	Passport.use(LocalStrategy);
	Passport.serializeUser(async function (user, done) {
		return done(null, user.id);
	});
	Passport.deserializeUser(async function (id, done) {
		try {
			const user = await ModelUser.findByPk(id);
			if (user == null) {
				throw new Error ("Invalid user id");
			}
			else {
				return done(null, user);
			}
		}
		catch (error) {
			console.error(`Failed to deserialize user ${id}`);
			console.error(error);
			return done (error, false);
		}
	})

	server.use(Passport.initialize());
	server.use(Passport.session());
}



const LocalStrategy = new Strategy ({
	usernameField: "email",
	passwordField: "password"
}, async function (email, password, done) {

	try {
		const user = await ModelUser.findOne({where: {
			email:    email,
			password: Hash.sha256().update(password).digest('hex')
		}});

        // ModelUser.findOne({ where: {email: email, password: Hash.sha256().update(password).digest("hex")} })
        // .then(user => {
        // if (user) {
        //     console.log("Welcome back,", user.username)
        //     // Need to change this. Currently passes the role through routes.
        //     return res.redirect('/?logged_in=true&role=' + user.role)
        // }


		if (user == null) {
			console.log("Invalid Credentials");
			return done(null, null);

		}
		else {
			return done(null, user);
		}
	}
	catch (error) {
		console.error(`Failed to auth user ${email}`);
		console.error(error);
	}
});



