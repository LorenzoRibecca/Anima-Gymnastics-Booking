const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const Classes = require('../models/classesModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400, false));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadTermImages = upload.fields({ name: 'image', maxCount: 1 });

exports.resizeTermImages = catchAsync(async (req, res, next) => {
  if (!req.files.image) return next();

  req.body.image = `term-${req.params.id}-${Date.now()}.jpeg`;
  await sharp(req.files.image[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/term/${req.body.image}`);
  next();
});

exports.getAllClasses = factory.getAll(Classes);
exports.getClass = factory.getOne(Classes);
exports.createClass = factory.createOne(Classes);
exports.updateClass = factory.updateOne(Classes);
exports.deleteClass = factory.deleteOne(Classes);
