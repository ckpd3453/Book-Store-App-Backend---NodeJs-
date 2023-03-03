import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    bookName: {
      type: String
    },
    description: {
      type: String
    },
    author: {
      type: String
    },
    discountPrice: {
      type: Number
    },
    bookImage: {
      type: String
    },
    admin_user_id: {
      type: String
    },
    quantity: {
      type: Number
    },
    price: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

export default model('Book', bookSchema);
