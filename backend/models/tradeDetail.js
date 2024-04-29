const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tradeName: {
    type: String,
    required: true
  },
  tradeType: {
    type: String,
    enum: ['Intraday', 'Options', 'Swing'],
    default:"Intraday",
    required: false
  },
  tradeAmount: {
    type: Number,
    required: true
  },
  buyOrSell: {
    type: String,
    enum: ['Buy', 'Sell'],
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const TradeDetail = mongoose.model('Trade', tradeSchema);

module.exports = TradeDetail;
