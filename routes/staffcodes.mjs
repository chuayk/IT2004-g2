import {ModelCode} from '../data/code.mjs';
import { Router } from 'express';
const router = Router();
export default router;
// retrieve codes page for staff
router.get("/update",updatecodeform)
router.post("/update",updatecode)
router.get("/codes", rendercodes);
router.get("/create", createcodeform);
router.post("/create", createcode);
router.post("/delete", deletecode)
/**
 * render codes table
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function rendercodes(req, res) {
    ModelCode.findAll().then((code) => {
        return res.render('staff/staffcodes.html', {
            codes_list: code
        });
    })
}



/**
 * render create code form
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function createcodeform(req, res) {
    return res.render('staff/createcode.html')
};

/**
 * create code
 * @param req {import('express').Request}
 * @param res {import('express').Response}
 * @returns 
 */
async function createcode(req, res) {
    //validation
    try {
        var codes = ModelCode.findAll()
        if (req.body.code.length != 10) {
            throw "code has to be 10 digits long";
        }
        else if (req.body.code in codes) {
            throw "code exists"
        };
        //code created
        console.log(req.body)
        const code = await ModelCode.create({
            code: req.body.code,
            type: req.body.type,
            amount: req.body.amount,
            expireon: req.body.end
        });
        return res.redirect("/staff/codes/codes")
    }
    catch (error) {
        console.error(error)
        return res.redirect("/staff/codes/create")
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