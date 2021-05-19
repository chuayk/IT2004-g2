import { Router } from 'express';
import product from '../data/createP.mjs';
import Code from '../data/code.mjs';
import Hash             		from 'hash.js';



const router = Router();
export default router;

//rout to product.mjs -xy
import RouterProduct from '../routes/product.mjs'
router.use("/product", RouterProduct)

// Creating users as an admin.

router.get("/accounts/createUsers", async function(req, res) {
	return res.render('staff/accounts/createUsers.html', {
	});
});

router.post("/accounts/createUsers", async function(req, res) {
	let {username, email, password, password2, phoneNumber, address, role} = req.body;
    console.log(req.body);
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
				ModelUser.create({username: req.body.username , email: req.body.email, password: Hash.sha256().update(req.body.password).digest("hex"), phoneNumber: req.body.number, address: req.body.address, role: req.body.role, accountStatus: req.body.status})
				.then(user => {
				// alertMessage(res, 'success', user.name + ' added. Please login', 'fas fa-sign-in-alt', true);
				return res.redirect('list/?param1=success')
				})
				.catch(err => console.log(err));
	}
	});

	});
	}
});



import { ModelUser } from '../data/user.mjs';

// delete user
router.post("/accounts/deleteUser",   async function(req, res) {
    // Retrieve ID from URL
	ModelUser.destroy({
		where: {"username": req.query.id}
	})
	.catch(err => console.log(err));
    return res.redirect('../list')
});

// update user
// Implement query, then update. Now only has update.

router.get("/accounts/updateUsers", async function(req, res) {
	return res.render('staff/accounts/updateUsers.html', {
        username: req.query.id
    });
});


router.post("/accounts/updateUsers",   async function(req, res) {
    // Retrieve ID from URL

    ModelUser.update({
        username: req.body.username,
        email: req.body.email,
        password:  Hash.sha256().update(req.body.password).digest("hex"),
        // number: "999",
        // mailingAddress: "Bishan",
        // Role: "Admin"
    }, {
            where: {
                username: req.query.id
            }
        })
	.catch(err => console.log(err));
	return res.redirect('../list')
});


router.get("/accounts/list",   async function(req, res) {
    ModelUser.findAll().then((user) => {
         // call views/video/editVideo.handlebar to render the edit video page
         return res.render('staff/accounts/retrieveUsers.html', {
            users_list: user,
        });
    }).catch(err => console.log(err)); // To catch no video ID
    // res.render('staff/retrieveUsers.html');
});






// retrieve codes page for staff
router.get("/codes", async function (req, res) {
    // var codes = Code.findAll()
    // console.log(codes["codes"])
    // return res.render('staff/staffcodes.html', {
    //      codes_list: codes       });
    Code.findAll().then((code) => {
        return res.render('staff/staffcodes.html', {
            codes_list: code
        });
    })
});
router.get("/createcode", async function (req, res) {
    return res.render('staff/createcode.html')
});
router.post("/createcode", async function (req, res) {
    try {
        var codes = Code.findAll()
        if (req.body.code.length != 10) {
            throw "code has to be 10 digits long";
        }
        else if (req.body.code in codes) {
            throw "code exists"
        };
        console.log("yay", req.body)
        await Code.create({ code: req.body.code, type: req.body.type, amount: req.body.amount, end: req.body.end });
        return res.redirect("/staff/codes")
    }
    catch (error) {
        console.error(error)
        return res.redirect("/staff/createcode")
    }

})
// router.get("/test",async function(req,res){
//     Code.findAll().then(function(codes){
//         console.log(codes);
//         res.send({data:codes[0]["code"]});
//       }).catch(function(err){
//         console.log('Oops! something went wrong, : ', err);
//      });
//});

//create walk in user -yh
router.get("/createWalkInUser", async function (req, res) {
    console.log("create walk in user page accessed");
    return res.render('staff/createWalkInUser.html');
});

router.post("/createWalkInUser", async function (req, res) {
    let { fullName, nric, gender, phoneNumber, temperature } = req.body;
    product.create({ fullName: req.body.fullName, nric: req.body.nricy, gender: req.body.gender, phoneNumber: req.body.phoneNumber, temperature: req.body.temperature })
        .then(product => {
            console.log(product.fullName + "success db")
            res.redirect('/');
        })
        .catch(err => console.log(err));
});