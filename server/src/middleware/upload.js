const multer = require("multer");
const sharp = require("sharp");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("only jpg/jpeg/png is allowed"));
    }
    cb(undefined, true);
  },
});

module.exports = { upload };
