const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/assets/uploads'); // Folder tempat file disimpan
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const uploadFile = multer({ storage });

  module.exports = uploadFile;