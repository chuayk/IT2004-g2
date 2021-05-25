import { Router } from 'express';
import product from '../data/createP.mjs';
import { UploadTo, DeleteFile, DeleteFilePath,UploadFile } from '../utils/multer.mjs';
const router = Router();
export default router;

//create product codes -xy

router.get("/createProduct",      async function(req, res) {
	console.log("create product page accessed");
	return res.render('staff/product/createProduct.html');
});

router.post("/createProduct",async function (req, res) {
    //const Uploader = UploadTo("public/img").single("file");

    //let {   productName, category,price, stockCount,description} = req.body;
    console.log(req.body);
    product.create({ name: req.body.productName, category: req.body.category, price: req.body.price, stock_count: req.body.stockCount, description: req.body.description })
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
    .then(product => {
        console.log(product.name + " added to db")
        res.redirect('/staff/product/createProduct');
        return res.render("staff/product/displayProduct.html", {
            path: req.file.path
        });
    })
    .catch(err => console.log(err + "what is this"))



});


router.get("/displayProduct", async function (req, res) {
    
    product.findAll().then(product => {
        return res.render('staff/product/displayProduct.html', {
            product_list: product,

        });
    }).catch(err => console.log(err)); // To catch no video ID
    // res.render('staff/retrieveUsers.html');
});

// router.get("/displayProduct/updateUsers/:id", async function (req, res) {
//     return res.render('staff/updateUsers.html', {
//         product: req.query.id
//     });
// });


