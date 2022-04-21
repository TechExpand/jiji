const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CategoryScema = new Schema({
    // user: { type: Schema.Types.ObjectId, ref: 'user' },
    // category: { type: Schema.Types.ObjectId, ref: 'category' },
    // image1: String,
    title: String,
    description: String,
  });
  
  const Category = mongoose.model('category', CategoryScema);

  module.exports = Category;
