const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    cartitemid: {
      type: Schema.Types.Mixed,
      required: true,
    },
    cartquantity: {
      type: Number,
      required: true,
    },
    cartuserid: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    cartpaymentid: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
