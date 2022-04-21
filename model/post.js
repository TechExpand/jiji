const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const PostScema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    postType: String,
    image1: String,
    image2: String,
    image3:  String,
    title: String,
    description: String,
    location: String,
    status: String,
    price: String,
    pricestatus: String,
    timeposted: String,
    condition: String,
  });
  
  const Post = mongoose.model('post', PostScema);

  module.exports = Post;
