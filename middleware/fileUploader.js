const multer = require("multer");
const path = require("path");
// var sharp = require('sharp');


const imageFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    return cb(null, true);
  } else {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
};

const multipleFileFilter = function (req, file, cb) {
  // console.log("my data =>>"+file.fieldname[resident_permit_passport])
  if (
    file.fieldname === "image/png"
    // file.mimetype === "image/jpg" ||
    // file.mimetype === "image/jpeg"
  ) {
    return cb(null, true);
  } else {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
};

const storageForStudent = multer.diskStorage({
  destination: "././uploads/students_profile_pic",
  filename: (req, res, next) => {
    let imgExt = res.mimetype.split("/")[1];
    return next(
      null,
      `${res.fieldname}_${Date.now()}${path.extname(
        res.originalname
      )}.${imgExt}`
    );
  },
});

const storageForMentor = multer.diskStorage({
  destination: "././uploads/mentor_profile_pic",
  filename: (req, res, next) => {
    let imgExt = res.mimetype.split("/")[1];
    return next(
      null,
      `${res.fieldname}_${Date.now()}${path.extname(
        res.originalname
      )}.${imgExt}`
    );
  },
});

const fileStorageForMentor = multer.diskStorage({
  destination: "././uploads/mentor_files",
  filename: (req, res, next) => {
    let imgExt = res.mimetype.split("/")[1];
    return next(
      null,
      `${res.fieldname}_${Date.now()}${path.extname(
        res.originalname
      )}.${imgExt}`
    );
  },
});

var uploadSingleImageForStudent = multer({
  storage: storageForStudent,
  fileFilter: imageFilter,
});
var uploadSingleImageForMentor = multer({
  storage: storageForMentor,
  fileFilter: imageFilter,
});
var uploadMultipleFilesForMentor = multer({ storage: fileStorageForMentor });

module.exports = {
  uploadSingleImageForStudent,
  uploadSingleImageForMentor,
  uploadMultipleFilesForMentor,
};
