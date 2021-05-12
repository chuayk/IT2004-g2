import { Router } from 'express';

const router = Router();

router.get('/home', (req,res) =>  {
    res.send('home')
})

router.get('/createP', async function(req,res) {
    console.log("create product page accessed get");
    return res.render('createP.html', {
	});
})

import  product from '../data/models.mjs';

router.post('/createP', async function(req,res) {
    let {   productName, category,price, stockCount,description} = req.body;
    product.create({productName,category,price,stockCount,description})
    .then(product => {
        console.log(product.productName+"success db")
        res.redirect('/home');
    })
    .catch(err => console.log(err));
	});

export default router;