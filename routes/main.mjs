import { Router } from 'express';
import twilio from 'twilio';

const router = Router();
export default router;

import { ModelUser } from '../data/user.mjs';


// If user is not verified, ie. res.locals.user.verified == 0, redirect back to ('/') note to joel


// ---------------- 
//	Serves dynamic files from the dynamic folder
router.get("/dynamic/:path", async function (req, res) {	
	return res.sendFile(`${process.cwd()}/dynamic/${req.params.path}`)
});

// ---------------- 
//	TODO: Attach additional routers here
import RouterAuth from './auth.mjs'
router.use("/auth", RouterAuth);

import RouterStaff from './staff.mjs'
router.use("/staff", RouterStaff)

import RouterMenu from '../routes/menu.mjs'
router.use("/", RouterMenu)

import RouterCart from '../routes/cart.mjs'
router.use("/", RouterCart)


// ---------------- 
//	TODO:	Common URL paths here


// 


// Confirm email page before accessing services





router.get("/confirmEmail", async function(req, res) {

	if (res.locals.user){
		if (res.locals.user.verification_hash == req.query.id)
		{
			ModelUser.update({
				emailVerified: true
			}, {
					where: {
						username: res.locals.user.username
					}
				})
			console.log('User verified! tight as hell gurl YOOO!')
			return res.redirect('/')
			
		}

	}
	return res.render('confirmEmail.html', {
	});

	
});


// Need to change passing in of "USER OBJECT" instead of just role. This is temporary.

router.get("/",      async function(req, res) {
	console.log("Home page accessed");
	// Prevent crashing
	if (res.locals.user){
		let verified = res.locals.user.emailVerified == 1;
		if (!verified)  {
			return res.redirect('/confirmEmail')
		}
	}

	// User signs in, matches hash string with url one.
	if (res.locals.user){
		if (res.locals.user.verification_hash == req.query.id)
		{
			ModelUser.update({
				emailVerified: true
			}, {
					where: {
						username: res.locals.user.username
					}
				})
			console.log('User verified! tight as hell gurl YOOO!')
		}
	}
	return res.render('index.html', {
		title: "Hello  Not Today",
	});
});


router.post("/", async function(req, res) {
	console.log("Contents received")
	console.log(req.body.OTP)
	console.log(res.locals.user.phoneNumber_pin);

	if (req.body.OTP == res.locals.user.phoneNumber_pin){
		ModelUser.update({
			phoneNumberVerified: true
		}, {
				where: {
					username: res.locals.user.username
				}
			})
			
	}
	return res.redirect('../')

});


// Customer Revview route

router.get("/review", async function(req, res) {



	console.log(req.params.update)
    ModelUser.findAll().then((user) => {
		return res.render('customerReview.html', {
		   users_list: user,
	   });
	   }).catch(err => console.log(err));
});


router.post("/review", async function(req, res) {
	console.log(req.body.comment);
	console.log(res.locals.user)
    ModelUser.update({
		comment: req.body.comment
    }, {
            where: {
                username: res.locals.user.username
            }
        })
	.catch(err => console.log(err));
	return res.redirect('../review')
});


router.get("/about", async function(req, res) {
	console.log("About page accessed");
	return res.render('about.html', {
		author: "The awesome programmer",
		values: [1, 2, 3, 4, 5, 6]
	});
});

router.get("/home", async function(req, res) {
	console.log("Home page accessed");
	return res.render('home.html', {
	});
});

