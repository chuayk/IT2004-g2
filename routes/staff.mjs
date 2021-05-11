import { Router } from 'express';

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
import {ModelCode} from '../data/code.mjs'
router.get("/createcode", create_code_page);
router.post("/createcode", create_code_process);
async function create_code_page(req, res) {
	console.log("Register page accessed");
	return res.render('auth/createcode.html');
}
/**
 * Process the code creation form body
 * @param {Request}  req Express Request handle
 * @param {Response} res Express Response handle
 */
async function create_code_process(req, res) {
	console.log("code creation contents received");
	console.log(req.body);
	let errors = [];
	//	Check your Form contents
	try {
		//remember to put validation here dum dum
	}
	catch (error) {
		console.error("There is errors with the registration form body.");
		console.error(error);
		return res.render('auth/createcode.html', { errors: errors });
	}

	//	Create new code, now that details are valid
		const code = await ModelCode.create({
				code:    req.body.code,
		});
		console.log("code saved")
		return res.redirect("/staff/createcode");
}

// end of dumb codes