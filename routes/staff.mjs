import { Router } from 'express';
import product from '../data/createP.mjs';

const router = Router();
export default router;

//create product codes -xy
router.get("/retrieveUsers",   async function(req, res) {
	console.log("FUCK");
    res.render('staff/retrieveUsers.html');
});

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
import {test} from '../data/models.mjs';
router.get("/test",   async function(req, res) {
test.create({please:"test"});
});
// end of dumb codes