const fs = require('fs');
const multer = require('multer');



module.exports.uploadDemo = function(req,res,fileN, dir,cb) {
    try {
        fs.mkdirSync(dir);
    } catch (error) {
        console.log(dir)   
    }
    
    let storage = multer.diskStorage({
        destination : function(req,file, cb) {
            cb(null, dir);
        },
    
        filename : function (req,file, cb) {
            cb(null, fileN);
        }
    
    })
    
    
    let upload = multer({storage : storage}).single('demo');


    upload(req,res, function(err,s) {
        if(err) {
            console.log(err);
            cb(err, null)
        }else {
            console.log(s);
            cb(null, s);
        }
    });



    return 'hello';
    


}