import Book from '../models/book.model';
import Cart from '../models/cart.model';
import HttpStatus from 'http-status-codes';

export const add = async (bookId, body) => {
  var response;
  const userId = body.userId;
  var book = await Book.findById(bookId);

  //If Book is present or not
  if (book) {
    var cart = await Cart.find({ userId: userId });
    // console.log(cart);
    //If Cart is Present or not for a user
    //If Cart present then check book and update quantity or add book if not present.
    //If Cart Not Present then create cart and add book
    if (cart[0] != null) {
      var check;
      cart.filter((x) => {
        if (x.books[0].productId === bookId) {
          console.log('obj', x.books[0]._id);
          check = x;
        } else {
          check = null;
        }
        // x.books.filter((x) => {
        //   if (x.productId === bookId) {
        //     check = x;
        //   }
        // });
      });
      console.log('Checking', check);

      //If Book is present in that cart or not
      //If present then update quantity else add to cart
      if (check != null) {
        const quant = check.books[0].quantity;
        const update = {
          userId: userId,
          books: [
            {
              productId: bookId,
              description: check.books[0].description,
              bookName: check.books[0].bookName,
              bookImage: check.books[0].bookImage,
              author: check.books[0].author,
              quantity: check.books[0].quantity + 1,
              price: check.books[0].price
            }
          ]
        };
        const updated = await Cart.updateOne({ _id: check._id }, update);
        response = {
          code: HttpStatus.OK,
          data: 'add one more',
          message: 'Added to cart successfully.'
        };
      } else {
        console.log('Noot present in cart');
        const cart = {
          userId: userId,
          books: [
            {
              productId: bookId,
              description: book.description,
              bookName: book.bookName,
              bookImage: book.bookImage,
              author: book.author,
              quantity: 1,
              price: book.price
            }
          ]
        };
        const collection = await Cart.create(cart);
        response = {
          code: HttpStatus.OK,
          data: collection,
          message: 'Added to cart successfully.'
        };
      }
      //   console.log(isPresent);
      //   console.log(cart[0].books[0].quantity + 1);
    } else {
      const cart = {
        userId: userId,
        books: [
          {
            productId: bookId,
            description: book.description,
            bookName: book.bookName,
            bookImage: book.bookImage,
            author: book.author,
            quantity: 1,
            price: book.price
          }
        ]
      };
      const collection = await Cart.create(cart);
      response = {
        code: HttpStatus.CREATED,
        data: collection,
        message: 'Added to cart successfully.'
      };
    }
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Null',
      message: 'No book exist with is id.'
    };
  }

  return response;
};
