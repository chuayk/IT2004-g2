import { response, Router } from 'express';

const router = Router();
export default router;


router.get("/retrieveUsers",   async function(req, res) {
	console.log("FUCK");
    res.render('staff/retrieveUsers.html');
});