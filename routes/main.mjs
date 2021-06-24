import { Router } from 		'express';
import twilio from 			'twilio';


const router = Router();
export default router;

import { ModelUser } from 	'../data/user.mjs';
import Sequelize from 		'sequelize';
import multer from 'multer';
var upload = multer({ dest: 'public/userPic' })
import fs from 'fs';
import Hash from 'hash.js';

// Imports OP from sequelize

const Op = Sequelize.Op


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

// import RouterMenu from '../routes/menu.mjs'
// router.use("/", RouterMenu)

// import RouterCart from '../routes/cart.mjs'
// router.use("/", RouterCart)


//	TODO:	Common URL paths here

router.get("/review",             					review);
router.get("/review-data",        					review_data);
router.get("/profile",             					profile);
router.post("/profile", upload.single('avatar'), 	profile_data);



// Confirm email page before accessing services



router.get("/confirmEmail", async function(req, res) {

	if (res.locals.user.emailVerified != 1) {
		// Check whether email hash from url parameter is euql to user's verification hash.
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
	else {
		return res.redirect('/')
	}
	return res.render('confirmEmail.html', {
	});

	
});




// Need to change passing in of "USER OBJECT" instead of just role. This is temporary.
router.get("/",      async function(req, res) {
	
	
	if (!res.locals.user){
		return res.redirect('/auth/login')
	}

	// If user is staff, automatically verify email & phone number.

	if (res.locals.user.role == "Staff") {
			ModelUser.update({
				emailVerified: true,
				phoneNumberVerified: true
			}, {
					where: {
						username: res.locals.user.username
					}
				})
	}


	console.log("Home page accessed");
	if (res.locals.user && res.locals.user.role != "Staff"){
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



async function review_data(req, res) {
	

    const users = await ModelUser.findAll({ where: { comment: {[Op.ne]: null} } });
    return res.json({
        "rows": users,
        "total": users.length,
		"image": "https://robohash.org/18.146.255.198.png"
    }
)


}

async function profile (req, res) {

	return res.render('customerProfile.html', {
		user: res.locals.user
	});
}


// res.locals.user

async function profile_data (req, res) {
console.log( res.locals.user.username)

// if req.body.username // email == user.username // email, let him pass .

let user = await ModelUser.findOne({ where: {username: res.locals.user.username}})


console.log(req.body.email)
console.log(user.email)
if ( req.body.email == user.email || req.body.password == user.password) {

console.log("yourmom")
// Delete user previous image
fs.unlinkSync(user.urlPic)

ModelUser.update({
	username: req.body.username,
	email: req.body.email,
	password: Hash.sha256().update(req.body.password).digest("hex"),
	phoneNumber: req.body.number,
	address: req.body.address,
	urlPic: req.file.path
}, {
	where: {username: res.locals.user.username}
})

	.catch(err => console.log(err)
	);

return res.redirect('/profile')
} 
else
{


ModelUser.findOne({ where: { email: res.locals.user.email} })
	.then(user => {
		if (user) {
			console.log("email already registered.")
			return res.render('customerProfile.html', {
				registeredEmail: true,
			});
		}

ModelUser.findOne({ where: { username: req.body.username } })
.then(user => {
	if (user) {
		console.log("username already registered.")
		return res.render('customerProfile.html', {
			registeredUsername: true,
		});
	}
	

	else{

// Retrieve ID from URL

fs.unlinkSync(user.urlPic)


ModelUser.update({
	username: req.body.username,
	email: req.body.email,
	password: Hash.sha256().update(req.body.password).digest("hex"),
	phoneNumber: req.body.number,
	address: req.body.address,
	urlPic: req.file.path
}, {
	where: {username: req.query.id}
})

	.catch(err => console.log(err)
	);

return res.redirect('/profile')


	}
}
);
});
}








}

async function review (req, res) {

	if (!res.locals.user){
		return res.redirect('/auth/login')
	}

	if (res.locals.user.verified == 0)
	{
		return res.redirect('/')
	}
	console.log(req.params.update)
    ModelUser.findAll().then((user) => {
		return res.render('customerReview.html', {
		   users_list: user,
		   user: res.locals.user
	   });
	   }).catch(err => console.log(err));
}


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

router.get("/error404", async function(req, res) {
	return res.render('error404.html', {
	});
});

router.get("/error403", async function(req, res) {
	return res.render('error403.html', {
	});
});
