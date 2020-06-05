const mongoose = require('mongoose');

const childrenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tell us your childs name.'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Tell us when your child was born.'],
  },
  gender: {
    type: String,
    required: [true, "Tell us your child's gender."],
    enum: ['male', 'female', 'prefer not to say'],
  },
  medicalInfo: {
    type: String,
  },
});

const Children = mongoose.model('Children', childrenSchema);

module.exports = Children;
