import multer from "multer"

const storage = multer.diskStorage({
    destination: function(req: any, file: any, cb: any){
        cb(null, "upload")
    },
    filename: function(req: any, file: any, cb: any){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
    },
});

//for signing up
 export const upload = multer({storage: storage}).single("avatar");

//  for creating an atrticle
 export const image = multer({storage: storage}).single("image");

 export default upload;
