import { Router } from 'express';

const router = Router();
export default router;

import { ModelUser } from '../data/user.mjs';


// If user is not verified, ie. res.locals.user.verified == 0, redirect back to ('/') note to joel


// ---------------- 
//	Serves dynamic files from the dynamic folder
router.get("/dynamic/:path", async function (req, res) {	
	return res.sendFile(`./dynamic/${req.params.path}`)
});

// ---------------- 
//	TODO: Attach additional routers here
import RouterAuth from './auth.mjs'
router.use("/auth", RouterAuth);

import RouterStaff from './staff.mjs'
router.use("/staff", RouterStaff)
// ---------------- 
//	TODO:	Common URL paths here

// Need to change passing in of "USER OBJECT" instead of just role. This is temporary.
router.get("/",      async function(req, res) {
	console.log("Home page accessed");
	// Prevent crashing
	if (res.locals.user){let verified = res.locals.user.verified == 1;
	}
	// User signs in, matches hash string with url one.
	if (res.locals.user){
		if (res.locals.user.verification_hash == req.query.id)
		{
			ModelUser.update({
				verified: true
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
		// Enable this for verification
		// verified: verified
	});
});

// Customer Revview route

router.get("/review", async function(req, res) {

	if (res.locals.user.verified == 0)
	{
		return res.redirect('/')
	}
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

