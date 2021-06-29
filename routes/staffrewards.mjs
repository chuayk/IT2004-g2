import {ModelReward} from '../data/rewards.mjs';
import { Router } from 'express';
const router = Router();
export default router;
// retrieve codes page for staff
// router.get("/update",updaterewardform)
// router.post("/update",updatrewards)
router.get("/rewards", renderrewards);
router.get("/create", createrewardform);
router.post("/create", createreward);
// router.post("/delete", deletereward)
/**
 * render rewards table
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function renderrewards(req, res) {
    ModelReward.findAll().then((reward) => {
        return res.render('staff/rewards/staffrewardss.html', {
            codes_list: reward
        });
    })
}



/**
 * render create code form
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function createrewardform(req, res) {
    return res.render('staff/rewards/createreward.html')
};

/**
 * create code
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function createreward(req, res) {
    //validation
    try {
        console.log(req.body)
        const code = await ModelReward.create({
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            amount: req.body.amount,
            duration: req.body.duration
        });
        return res.redirect("/staff/rewards/rewards")
    }
    catch (error) {
        console.error(error)
        return res.redirect("/staff/rewards/rewards")
    }

};
/**
 * render update code form
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function updatecodeform(req, res){    //retrieve code
    var impcode = req.query.code;
    const selectcode = await ModelCode.findOne({where:{code:impcode}});
    //render page
    res.render("staff/updatecode.html",{
        code : selectcode
    })};


/**
 * update code process
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function updatecode(req,res){
    
        ModelCode.update({
            code : req.body.code,
            type: req.body.type,
            amount: req.body.amount,
            end : req.body.end,
        },{where:{ code : req.query.code}})
        return res.redirect("/staff/codes/codes")
    };
/**
 * Delete code
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function deletecode(req,res){
    var impcode = req.query.code;
    console.log("checking"+impcode)
    ModelCode.destroy({where:{"code" : impcode}})
    res.redirect("/staff/codes/codes")
}