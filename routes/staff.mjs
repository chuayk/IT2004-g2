import { Router } from 'express';
import product from '../data/createP.mjs';
import Code from '../data/code.mjs';


const router = Router();
export default router;


import { ModelUser } from '../data/user.mjs';

router.get("/retrieveUsers",   async function(req, res) {
    ModelUser.findAll().then((user) => {
         // call views/video/editVideo.handlebar to render the edit video page
         return res.render('staff/retrieveUsers.html', {
            users_list: user
        });
        }).catch(err => console.log(err)); // To catch no video ID
    // res.render('staff/retrieveUsers.html');
});

//create product codes -xy

router.get("/createProduct",      async function(req, res) {
	console.log("create product page accessed");
	return res.render('staff/createProduct.html');
});

router.post("/createProduct", async function(req,res) {
    let {   productName, category,price, stockCount,description} = req.body;
    product.create({productName,category,price,stockCount,description})
    .then(product => {
        console.log(product.productName+"success db")
        res.redirect('/');
    })
    .catch(err => console.log(err));
	});


// joels pethetic attempt at code pls ignore
router.get("/test",async function(req,res){
    Code.findAll().then((code) => {
        return res.render('staff/staffcodes.html', {
           code_list: code
       });
       })
} );

// end of dumb codes