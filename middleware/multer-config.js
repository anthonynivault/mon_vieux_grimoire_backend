const multer = require('multer');

const MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png'];

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES.includes(file.mimetype)) {
    callback(null, true);} 
  else {
    callback(new Error('Type de fichier non autorisé'), false);}};

module.exports = multer({storage: storage,fileFilter: fileFilter}).single('image');