import { Schema, model } from 'mongoose';

const buyerDetailSchema = new Schema({
  userId: {
    type: String
  },
  details: [
    {
      name: {
        type: String
      },
      phone: {
        type: Number
      },
      pincode: {
        type: Number
      },
      address: {
        type: String
      },
      city: {
        type: String
      },
      state: {
        type: String
      },
      landmark: {
        type: String
      }
    }
  ]
});
export default model('BuyerDetails', buyerDetailSchema);
