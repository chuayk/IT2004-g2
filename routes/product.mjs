
import { Router } from 'express';
import { ModelProduct } from '../data/createProduct.mjs';
import Sequelize from 'sequelize';
import { UploadTo, DeleteFile, DeleteFilePath, UploadFile, UploadProductImage } from '../utils/multer.mjs';

const router = Router();
export default router;


//create product codes -xy
router.get("/createProduct", createProduct)
router.post("/createProduct", createProductPost)
router.get("/displayProduct", displayProduct)
router.get("/displayProduct-data", displayProductData)
router.get("/updateProduct", updateProduct)
router.post("/updateProduct", updateProductPost)
router.get("/deleteProduct", deleteProduct)


async function createProduct(req, res) {
    console.log("create product page accessed");
    return res.render('staff/product/createProduct.html');
};

async function createProductPost(req, res) {
    const Uploader = UploadTo().single("productPic");
    return Uploader(req, res, async function (error_upload) {
        if (error_upload) {
            console.error(`An error has occurred during the uploading of file`);
            console.error(error_upload);
        }
        else {

            try {
                console.log(req.body)
                const product = await ModelProduct.create({
                    pname: req.body.productName,
                    category: req.body.category,
                    price: (req.body.price) *= 100, //in cents
                    stockCount: req.body.stockCount,
                    description: req.body.description,
                    picUrl: req.file.path
                    
                });
                console.log(product.pname + " success db")
                console.log(`File uploaded without problems`);
               
                return res.render("staff/product/createProduct.html", {
                    path: req.file.path
                });
            }
            catch (error) {
                console.error(`File is uploaded but something crashed`);
                console.error(error);
                DeleteFile(req.file);
                return res.sendStatus(400).end();
            }
        }
    });
}


async function displayProduct(req, res) {
    ModelProduct.findAll().then((products) => {
        return res.render('staff/product/displayProduct.html'), {
            productList: products
        }
    }).catch(err => console.log(err))
}

const Op = Sequelize.Op


async function displayProductData(req, res) {
    //const products = await ModelProduct.findAll({raw: true});
    /**
         * @type {WhereOptions}
         */
    const condition = (req.query.search) ? {
        [Op.or]: {
            "pname": { [Op.substring]: req.query.search }           
        }
    } : undefined;

    const total = await ModelProduct.count({
        where: condition
    });

    const productss = await ModelProduct.findAll({
        where: condition,
        // offset: parseInt(req.query.offset),
        // limit: parseInt(req.query.limit),
        order: (req.query.sort) ? [[req.query.sort, req.query.order.toUpperCase()]] : undefined,
        raw: true
    })
    return res.json({
        "total": total,
        "rows": productss
    });

};



async function updateProduct(req, res) {
    //const productsss = await ModelProduct.findAll({where:{uuid:req.query.id}})
    return res.render('staff/product/updateProduct.html', {
        product_uuid: req.query.id,

    });
}

async function updateProductPost(req, res) {
    // Retrieve ID from URL
    try {
        console.log(req.body)
        ModelProduct.update({
            pname: req.body.productName,
            category: req.body.category,
            price: (req.body.price) *= 100, //in cents
            stockCount: req.body.stockCount,
            description: req.body.description
        }, {
            where: {
                product_uuid: req.query.id
            }
        })
        return res.redirect("/staff/displayProduct")
    }
    catch (error) {
        console.error(error);
        return res.status(500).end();
    };
}


async function deleteProduct(req, res) {
    ModelProduct.destroy({
        where: { "product_uuid": req.query.id }
    })
        .catch(err => console.log(err));
    console.log("Produt deleted")
    return res.redirect('/staff/displayProduct')
}