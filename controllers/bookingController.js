const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Classes = require('../models/classesModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const classes = await Classes.findById(req.params.groupId);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get(
      'host'
    )}/my-classes?alert=booking`,
    cancel_url: `${req.protocol}://${req.get('host')}/classes/${classes.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.classId,
    line_items: [
      {
        name: `${classes.name} Class`,
        description: classes.summary,
        images: [
          `${req.protocol}://${req.get('host')}/img/type/${classes.image}`,
        ],
        amount: classes.fullPrice * 100,
        currency: 'gbp',
        quantity: 1,
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    session,
  });
});

const createBookingCheckout = async (session) => {
  const classes = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.display_items[0].amount / 100;
  await Booking.create({ classes, user, price });
};

exports.webhookCheckout = async (req, res, next) => {
  const signature = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.contructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
