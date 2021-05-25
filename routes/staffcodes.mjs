import Code from '../data/code.mjs';
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
//render codes table
async function rendercodes(req, res) {
    // var codes = Code.findAll()
    // console.log(codes["codes"])
    // return res.render('staff/staffcodes.html', {
    //      codes_list: codes       });
    Code.findAll().then((code) => {
        return res.render('staff/staffcodes.html', {
            codes_list: code
        });
    })
}



//render create code form
async function createcodeform(req, res) {
    return res.render('staff/createcode.html')
};

// create code
async function createcode(req, res) {
    //validation
    try {
        var codes = Code.findAll()
        if (req.body.code.length != 10) {
            throw "code has to be 10 digits long";
        }
        else if (req.body.code in codes) {
            throw "code exists"
        };
        //code created
        await Code.create({ code: req.body.code, type: req.body.type, amount: req.body.amount, end: req.body.end });
        return res.redirect("/staff/codes/codes")
    }
    catch (error) {
        console.error(error)
        return res.redirect("/staff/codes/create")
    }

};

//render update code form
async function updatecodeform(req, res){    //retrieve code
    var impcode = req.query.code;
    const selectcode = await Code.findOne({where:{code:impcode}});
    //render page
    res.render("staff/updatecode.html",{
        code : selectcode
    })};



// update code process
async function updatecode(req,res){
    
        Code.update({
            code : req.body.code,
            type: req.body.type,
            amount: req.body.amount,
            end : req.body.end,
        },{where:{ code : req.query.code}})
        return res.redirect("/staff/codes/codes")
    };
export async function deletecode(req,res){
    Code.destroy({where:{code : req.query.code}})
    res.redirect("/staff/codes/codes")
}