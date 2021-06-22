import { Router } from 'express';
import{ ModelProduct } from '../data/createProduct.mjs';
const router = Router();
export default router;

router.get("/menu", async function(req,res){
    ModelProduct.findAll().then(product => {
        return res.render('customer/menu.html',{
            product_list: product,
        })
    })
})