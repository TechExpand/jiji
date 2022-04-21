const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ReviewScema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    post: { type: Schema.Types.ObjectId, ref: 'post' },
    date: String,
    review: String,
    rate: String,
    postowner: String,
  });
  
  const Review = mongoose.model('review', ReviewScema);

  module.exports = Review;
