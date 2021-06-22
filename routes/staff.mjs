import { Router } from 'express';
//import WalkInUser from '../data/createWalk.mjs';
//import Code from '../data/code.mjs';
import Hash from 'hash.js';



const router = Router();
export default router;

//rout to product.mjs -xy
import RouterProduct from '../routes/product.mjs'
router.use("/", RouterProduct)

import RouterReward from '../routes/staffcodes.mjs'
router.use("/codes", RouterReward)

// Imports model user for database
import { ModelUser } from '../data/user.mjs';
import Sequelize from 'sequelize';
import multer from 'multer';
var upload = multer({ dest: 'public/userPic' })

// rout to product.mjs -yh
// import RouterWalkInUser from '../routes/WalkInUser.mjs'
// router.use("/walkInUser", RouterWalkInUser)

router.get("/accounts/list",                                    viewUser_page);
router.get("/accounts/list/data",                               viewUser_data);
router.get("/accounts/createUsers",                             createUser_page);
router.post("/accounts/createUsers", upload.single('avatar'),   createUser_process);
router.get("/accounts/deleteUser",                              deleteUser_process);
router.get("/accounts/updateUsers",                             updateUser_page);
router.post("/accounts/updateUsers",                            updateUser_process);



// Creating users as an admin.

async function createUser_page(req, res) {

    
    // Enable this to prevent guests from accessing the page.
    // if (!res.locals.user || res.locals.user.role == "Guest"){
	// 	return res.redirect('/error403')
	// }

    
    return res.render('staff/accounts/createUsers.html', {
    });
}

async function createUser_process(req, res) {
    console.log(req.file)
    let { username, email, password, password2, phoneNumber, address, role } = req.body;
    console.log(req.body);
    if (req.body.password.length < 4) {
        return res.send('Password must be at least 4 characters')
    }
    else if (req.body.password != req.body.password2) {
        return res.send('Passwords do not match')
    }
    else {
        ModelUser.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (user) {
                    console.log("email already registered.")
                    return res.render('staff/accounts/createUsers.html', {
                        registeredEmail: true,
                    });
                }

                ModelUser.findOne({ where: { username: req.body.username } })
                    .then(user => {
                        if (user) {
                            console.log("username already registered.")

                            return res.render('staff/accounts/createUsers.html', {
                                registeredUsername: true,
                            });
                        }

                        else {
                            ModelUser.create({ username: req.body.username, role: req.body.role, email: req.body.email, password: Hash.sha256().update(req.body.password).digest("hex"), verification_hash: Hash.sha256().update(req.body.email).digest("hex"),phoneNumber: req.body.number, address: req.body.address, phoneNumber_pin: Math.random().toString().substr(2,4), urlPic: req.file.path})
                            .then(user => {
                                    // alertMessage(res, 'success', user.name + ' added. Please login', 'fas fa-sign-in-alt', true);
                                    return res.redirect('/staff/accounts/list')
                                })
                                .catch(err => console.log(err));
                        }
                    });

            });
    }
}



/**
 * 
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
 async function deleteUser_process(req, res) {
    // Retrieve ID from URL
ModelUser.destroy({
    where: { "username": req.query.id }
})
    .catch(err => console.log(err));
console.log("User deleted")
return res.redirect('/staff/accounts/list')
}

/**
 * 
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function updateUser_page(req, res) {

    
    // Enable this to prevent guests from accessing the page.
    // if (!res.locals.user || res.locals.user.role == "Guest"){
	// 	return res.redirect('/error403')
	// }

    return res.render('staff/accounts/updateUsers.html', {
        username: req.query.id
    });
}


async function updateUser_process(req, res) {

    
    // Retrieve ID from URL
    console.log(req.body.role);

    ModelUser.update({
        username: req.body.username,
        email: req.body.email,
        password: Hash.sha256().update(req.body.password).digest("hex"),
        phoneNumber: req.body.number,
        address: req.body.address,
        role: req.body.role,
        accountStatus: req.body.status
    }, {
        where: {
            username: req.query.id
        }
    })
        .catch(err => console.log(err));
    return res.redirect('/staff/accounts/list')
}


async function viewUser_page(req, res) {

    // Enable this to prevent guests from accessing the page.
    // if (!res.locals.user || res.locals.user.role == "Guest"){
	// 	return res.redirect('/error403')
	// }

    ModelUser.findAll().then((user) => {
        return res.render('staff/accounts/retrieveUsers.html', {
            users_list: user,
        });
    }).catch(err => console.log(err)); // To catch no video ID
    // res.render('staff/retrieveUsers.html');
}


const Op = Sequelize.Op

/**
 * 
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */

 async function viewUser_data(req, res) {

    // const users = await ModelUser.findAll({raw: true});
    /**
     * @type {WhereOptions}
     */
    const condition = (req.query.search) ? {
        [Op.or]: {
            "username": { [Op.substring] : req.query.search },
            "email": { [Op.substring]: req.query.search},
        }
    } : undefined;

    const total = await ModelUser.count({
        where: condition
    });

    const users = await ModelUser.findAll({
        where: condition,
        // offset: parseInt(req.query.offset),
        // limit: parseInt(req.query.limit),
        order: (req.query.sort) ? [[req.query.sort, req.query.order.toUpperCase()]] : undefined,
        raw: true
    })


    return res.json({
        "rows": users,
        // "total": users.length
        "total": total
    }
)


}


// //create walk in user -yh
// router.get("/createWalkInUser", async function (req, res) {
//     console.log("create walk in user page accessed");
//     return res.render('staff/createWalkInUser.html');
// });

// router.post("/createWalkInUser", async function (req, res) {
//     let { fullName, nric, gender, phoneNumber, temperature } = req.body;
//     WalkInUser.create({ fullName: req.body.fullName, nric: req.body.nricy, gender: req.body.gender, phoneNumber: req.body.phoneNumber, temperature: req.body.temperature })
//         .then(WalkInUser => {
//             console.log(WalkInUser.fullName + "success db")
//             res.redirect('/');
//         })
//         .catch(err => console.log(err + "what is this"));
// });