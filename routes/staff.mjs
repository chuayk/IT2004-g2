import { Router } from 'express';
import product from '../data/createP.mjs';
import Code from '../data/code.mjs';


const router = Router();
export default router;


router.get("/createUsers", async function (req, res) {
    return res.render('staff/createUsers.html', {
    });
});


import { ModelUser } from '../data/user.mjs';

// delete user
router.post("/retrieveUsers/deleteUser", async function (req, res) {
    // Retrieve ID from URL
    ModelUser.destroy({
        where: { "username": req.query.id }
    })
        .catch(err => console.log(err));
    return res.redirect('..')
});

// update user
// Implement query, then update. Now only has update.

router.get("/retrieveUsers/updateUsers", async function (req, res) {
    return res.render('staff/updateUsers.html', {
        username: req.query.id
    });
});


router.post("/retrieveUsers/updateUsers", async function (req, res) {
    // Retrieve ID from URL

    ModelUser.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        // number: "999",
        // mailingAddress: "Bishan",
        // Role: "Admin"
    }, {
        where: {
            username: req.query.id
        }
    })
        .catch(err => console.log(err));
    return res.redirect('..')
});


router.get("/retrieveUsers", async function (req, res) {
    ModelUser.findAll().then((user) => {
        // call views/video/editVideo.handlebar to render the edit video page
        return res.render('staff/retrieveUsers.html', {
            users_list: user,
        });
    }).catch(err => console.log(err)); // To catch no video ID
    // res.render('staff/retrieveUsers.html');
});



//create product codes -xy

router.get("/createProduct", async function (req, res) {
    console.log("create product page accessed");
    return res.render('staff/createProduct.html');
});

router.post("/createProduct", async function (req, res) {

    //let {   productName, category,price, stockCount,description} = req.body;

    console.log(req.body)
    product.create({ name: req.body.productName, category: req.body.category, price: req.body.price, stock_count: req.body.stockCount, description: req.body.description })
        .then(product => {
            console.log(product.name + " added to db")
            res.redirect('/staff/createProduct');
        })
        .catch(err => console.log(err + "what is this"));
});


router.get("/displayProduct", async function (req, res) {
    product.findAll().then(product => {
        return res.render('staff/displayProduct.html', {
            product_list: product,
        });
    }).catch(err => console.log(err)); // To catch no video ID
    // res.render('staff/retrieveUsers.html');
});

router.get("/displayProduct/updateUsers/:id", async function (req, res) {
    return res.render('staff/updateUsers.html', {
        product: req.query.id
    });
});

router.post("/retrieveUsers/updateUsers", async function (req, res) {
    // Retrieve ID from URL

    ModelUser.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        // number: "999",
        // mailingAddress: "Bishan",
        // Role: "Admin"
    }, {
        where: {
            username: req.query.id
        }
    })
        .catch(err => console.log(err));
    return res.redirect('..')
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