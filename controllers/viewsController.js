const Classes = require('../models/classesModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking')
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getOverview = catchAsync(async (req, res) => {
  const classess = await Classes.find();
  res.status(200).render('overview', {
    title: 'All Classes',
    classess,
  });
});
exports.getManageClasses = catchAsync(async (req, res) => {
  const classess = await Classes.find();
  res.status(200).render('manageClasses.pug', {
    title: 'Manage All Classes',
    classess,
  });
});
exports.getBilling = catchAsync(async (req, res) => {
  res.status(200).render('billing.pug', {
    title: 'Billing',
  });
});
exports.getManageUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).render('manageUsers.pug', {
    title: 'Manage Users',
    users,
  });
});

exports.updateClassData = catchAsync(async (req, res, next) => {
  const updatedClass = await Classes.findByIdAndUpdate(
    req.classes.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('manageClasses', {
    title: 'Your class',
    classes: updatedClass,
  });
});

exports.getClass = catchAsync(async (req, res, next) => {
  // 1) get the data, for the requested tour ( including reviews and guides )
  const classes = await Classes.findOne({ slug: req.params.slug });

  if (!classes) {
    return next(new AppError('There is no type with that name.', 404));
  }
  // 2) Build template

  // 3) Render template using data from 1)

  res.status(200).render('classes', {
    title: `${classes.name} class`,
    classes,
  });
});

exports.updateClass = (req, res) => {
  res.status(200).render('updateClass', {
    title: `Update class`,
  });
};

exports.addAClass = (req, res) => {
  res.status(200).render('newClass', {
    title: 'Create a new class',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up for an account',
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyClasses = catchAsync(async (req, res, next) => {
  // 1) Find all Bookings
  const bookings = await Booking.find({ user: req.user.id });
  // 2) Find tours with the returned IDs
  const classesIDs = bookings.map((el) => el.type);
  const classess = await Classes.find({ _id: { $in: classesIDs } });

  res.status(200).render('overview', {
    title: 'My Classes',
    classess,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
