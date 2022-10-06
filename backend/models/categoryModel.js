const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
  image: {
    type: String,
  },
});

categorySchema.virtual('id').get(function () {
  return this._id.toString();
});

categorySchema.set('toJSON', {
  virtuals: true,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
