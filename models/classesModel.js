const mongoose = require('mongoose');
const slugify = require('slugify');

const classesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'You must specify a type of class.'],
    },
    venue: {
      type: String,
      required: [true, 'A class needs a venue'],
    },
    term: {
      type: String,
      required: [true, 'A class must belong to a term.'],
    },
    day: {
      type: String,
      required: [true, 'A class should be on a specific day.'],
    },
    time: {
      type: String,
      required: [true, 'A class needs a time.'],
    },
    duration: {
      type: Number,
      required: [true, 'A class needs a duration.'],
    },
    startDate: {
      type: Date,
      required: 'A term requires a start date.',
    },
    endDate: {
      type: Date,
      required: 'A term requires an end date.',
    },
    age: {
      type: String,
      required: [true, 'You must specify a minimum age.'],
    },
    maxCapacity: {
      type: Number,
      required: [true, 'A class must have a max capacity.'],
    },
    private: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, 'A class must have a description'],
    },
    imageCover: {
      type: String,
    },
    imageTerm: {
      type: String,
    },
    imageClass: [String],
    slug: String,
    fullPrice: {
      type: Number,
      required: [true, 'A class must have a price.'],
    },
    classPrice: {
      type: Number,
      required: [true, 'What is the price of each session?'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Query middleware
classesSchema.virtual('durationHours').get(function () {
  return this.duration / 60;
});

classesSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

classesSchema.pre('save', function (next) {
  this.slug = slugify(this.name + this.id, {
    lower: true,
  });
  this.imageCover = `${this.name}.jpg`;
  this.imageTerm = `${this.term}.jpg`;
  this.imageClass = ['anima-1.jpg', 'anima-2.jpg', 'anima-3.jpg'];
  next();
});

const Classes = mongoose.model('classes', classesSchema);

module.exports = Classes;
