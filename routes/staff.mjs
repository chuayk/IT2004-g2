import { Router } from 'express';
import product from '../data/models.mjs';

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
// joels pethetic attempt at code pls ignore
import {test} from '../data/models.mjs';
router.get("/test",   async function(req, res) {
test.create({please:"test"});
});
// end of dumb codes