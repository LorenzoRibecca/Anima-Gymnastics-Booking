const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/class/:slug', authController.isLoggedIn, viewsController.getClass);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLoggedIn, viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);
router.get('/add-a-class', authController.protect, viewsController.addAClass);
router.get('/my-classes', authController.protect, viewsController.getMyClasses);
router.get(
  '/manage-classes',
  authController.protect,
  viewsController.getManageClasses
);
router.get('/billing', authController.protect, viewsController.getBilling);
router.get(
  '/manage-users',
  authController.protect,
  viewsController.getManageUsers
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData
);

router.get(
  '/manage-classes/:id',
  authController.protect,
  viewsController.updateClass
);

module.exports = router;
