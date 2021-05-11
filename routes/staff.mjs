import { response, Router } from 'express';

const router = Router();
export default router;


router.get("/retrieveUsers",   async function(req, res) {
	console.log("FUCK");
    res.render('staff/retrieveUsers.html');
});

router.get("/createProduct",      async function(req, res) {
	console.log("create product page accessed");
	return res.render('staff/createProduct.html');
});