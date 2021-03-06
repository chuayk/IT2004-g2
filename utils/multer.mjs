/**
 * This utility file contains pre-determined areas of files where you wanted to upload to.
 * However, you need to understand that using Multer module, it doesn't help you do clean up
 * in the event that your form validation is wrong. So do remember to delete the uploaded file
 * if an error occurred or bad request.
**/
import Multer  from 'multer';
import FileSys from 'fs';
import Path    from 'path';
import {v1} from 'uuid';

/**
 * File filter used to accept image files only
 * @param type   {string} The type of file to accept usually "image" "audio" "video" "text"
 * @param req    {Express.Request} Express request handle
 * @param file   {Express.Multer.File} Multer File
 * @param result {Multer.FileFilterCallback} Multer file callback handle
 */
function FilterFile(type, req, file, result) {
	//	File mimetype must be defined and includes the defined type
	if (file.mimetype != undefined && file.mimetype.includes(type)) {
		return result(null, true);
	}
	else {
		console.warn(`The file received is not of accepted mimetype ${file.mimetype}`);
		return result(new Error("Invalid file type received"), false);
	}
}

/** Where the files are going to be located */
// export const Path = `dynamic`;
/** Multer handler for uploading arbitrary files */
export const UploadFile         = Multer({ dest:   `${process.cwd()}/dynamic/file` });
/** Multer handler for uploading profile images */
export const UploadProfileImage = Multer({ dest:   `${process.cwd()}/dynamic/profile`, fileFilter: FilterFile.bind(this, "image") });
/** Multer handler for uploading product images */
export const UploadProductImage = Multer({ dest:   `${process.cwd()}/dynamic/product`, fileFilter: FilterFile.bind(this, "image") });
const storage = Multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/productpic')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, `${v1()}-${originalname}`);
    }
})
/**
 * Function to delete a uploaded file
 * @param files {...Express.Multer.File}
**/
export async function DeleteFile(...files) {
	for (let file of files) {
		if (FileSys.existsSync(file.destination))
			return FileSys.unlinkSync(file.destination);
		else
			console.warn(`Attempting to delete non-existing file(s) ${file}`);
	}
}
export function UploadTo( filter = undefined) {
	if (filter != undefined) 
		filter = FilterFile.bind(this, filter);
	return Multer({ storage});
}
export function DeleteFilePath(...files) {
	for (let file of files) {
		if (FileSys.existsSync(file)) {
			console.log(`Removing from server: ${file}`);
			return FileSys.unlinkSync(file);
		}
		else
			console.warn(`Attempting to delete non-existing file(s) ${file}`);
	}
}



// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 	  cb(null, '/tmp/my-uploads')
// 	},
// 	filename: function (req, file, cb) {
// 	  cb(null, file.fieldname + '-' + Date.now())
// 	}
//   })
