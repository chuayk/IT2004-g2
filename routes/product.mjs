import { Router } from 'express';
import {ModelProduct} from '../data/createProduct.mjs';
import { UploadTo, DeleteFile, DeleteFilePath,UploadFile } from '../utils/multer.mjs';
const router = Router();
export default router;

//create product codes -xy

router.get("/createProduct",      async function(req, res) {
	console.log("create product page accessed");
    
	return res.render('staff/product/createProduct.html');
});

router.post("/createProduct",async function (req, res) {
    try{
        console.log(req.body)
        const product = await ModelProduct.create({
            pname : req.body.productName,
            category : req.body.category,
            price : (req.body.price)*=100, //in cents
            stockCount : req.body.stockCount,
            description : req.body.description
        });
        console.log(product.pname+"success db")
        res.redirect('/staff/displayProduct');
    }


    catch(error){
        console.error(error);
		return res.status(500).end();      
	};
    //const Uploader = UploadTo("public/img").single("file");
    // Uploader(req, res, async function (error_upload) {
    
    //     if (error_upload) {
    //         console.error(`An error has occurred during the uploading of file`);
    //         console.error(error_upload);
    //         file_success = false;
    //     }
    //     else {
            
    //         try {
        
    //             console.log (`File uploaded without problems`);
    //             return res.render('/staff/product/createProduct', {
    //                 path: req.file.path
    //             });
    //         }
    //         catch (error) {
    //             console.error(`File is uploaded but something crashed`);
    //             console.error(error);
    //             DeleteFile(req.file);
    //             return res.sendStatus(400).end();
    //         }
    //     }
    // }




});
router.get("/displayProduct", async function (req, res) {
    return res.render('staff/product/displayProduct.html')
})

router.get("/displayProduct-data", async function (req, res) {
    
    // ModelProduct.findAll().then(product => {
    //     return res.render('staff/product/displayProduct.html', {
    //         product_list: product,

    //     });
    // }).catch(err => console.log(err)); // To catch no video ID
    // res.render('staff/retrieveUsers.html');
    const product = await ModelProduct.findAll({raw: true});
	return res.json({
		"total": product.length,
		"rows":  product
	});

});



// router.get("/displayProduct/updateUsers/:id", async function (req, res) {
//     return res.render('staff/updateUsers.html', {
//         product: req.query.id
//     });
// });


