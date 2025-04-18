const multer = require('multer');
const path = require('path');

// configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// file filter
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image/")) {
        cb(null, true);
    }
    else {
        cb(new Error("Not an image! Please upload an image"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5* 1024 * 1024 // 5MB limit
    }
});

module.exports = upload;
