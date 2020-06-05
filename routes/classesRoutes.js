const express = require('express');
const classesController = require('../controllers/classesController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(classesController.getAllClasses)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-coach'),
    classesController.createClass
  );
router
  .route('/:id')
  .get(classesController.getClass)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-coach'),
    classesController.updateClass
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-coach'),
    classesController.deleteClass
  );

module.exports = router;
