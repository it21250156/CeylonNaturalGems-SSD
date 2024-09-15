const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define allowed file types and size limits
const allowedTypes = ['image/jpeg', 'image/png'];
const maxSize = 5 * 1024 * 1024; // 5 MB

// Ensure the upload directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Multer config
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // Ensure directory exists
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            // Define the file name
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
        }
    }),
    fileFilter: (req, file, cb) => {
        // Check file type
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Unsupported file type!"), false);
        }
        cb(null, true);
    },
    limits: {
        fileSize: maxSize, // Set file size limit
    }
});

module.exports = upload;
