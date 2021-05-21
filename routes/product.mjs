import { Router } from 'express';
import product from '../data/createP.mjs';
const router = Router();
export default router;

//create product codes -xy

router.get("/createProduct",      async function(req, res) {
	console.log("create product page accessed");
    
	return res.render('staff/product/createProduct.html');
});

router.post("/createProduct", async function (req, res) {

    //let {   productName, category,price, stockCount,description} = req.body;

    console.log(req.body)
    product.create({ name: req.body.productName, category: req.body.category, price: req.body.price, stock_count: req.body.stockCount, description: req.body.description })
        .then(product => {
            console.log(product.name + " added to db")
            res.redirect('/staff/product/createProduct');
        })
        .catch(err => console.log(err + "what is this"));
});


router.get("/displayProduct", async function (req, res) {
    product.findAll().then(product => {
        return res.render('staff/product/displayProduct.html', {
            product_list: product,
        });
    }).catch(err => console.log(err)); // To catch no video ID
    // res.render('staff/retrieveUsers.html');
});

// router.get("/displayProduct/updateUsers/:id", async function (req, res) {
//     return res.render('staff/updateUsers.html', {
//         product: req.query.id
//     });
// });