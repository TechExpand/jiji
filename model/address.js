const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const AddressScema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    postcode: String,
    state: String,
    city: String,
    country: String,
  });
  
  const Address = mongoose.model('address', AddressScema);

  module.exports = Address;
