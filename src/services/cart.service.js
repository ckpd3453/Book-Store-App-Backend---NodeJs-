import Book from '../models/book.model';
import Cart from '../models/cart.model';
import HttpStatus from 'http-status-codes';

var allBooks;
async function totalAmount(userId) {
  var total = 0;
  allBooks = await Cart.find({ userId: userId });
  await allBooks.map((obj) => {
    if (obj.books[0].quantity >= 1) {
      total = total + obj.books[0].price * obj.books[0].quantity;
    } else {
      total = total + 0;
    }
  });
  return total;
}

function totalPrice(price, quantity) {
  return price * quantity;
}

export const add = async (bookId, body) => {
  var response;
  const userId = body.userId;
  var book = await Book.findById(bookId);

  //If Book is present or not
  if (book) {
    var cart = await Cart.find({ userId: userId });

    //If Cart is Present or not for a user
    //If Cart present then check book and update quantity or add book if not present.
    //If Cart Not Present then create cart and add book
    if (cart[0] != null) {
      var check;
      cart.filter((x) => {
        if (x.books[0].productId === bookId) {
          check = x;
        } else {
          check = null;
        }
      });

      //If Book is present in that cart or not
      //If present then update quantity else add to cart
      if (check != null) {
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
              price: check.books[0].price,
              totalPrice: totalPrice(
                check.books[0].price,
                check.books[0].quantity + 1
              )
            }
          ]
        };
        // await Cart.updateOne({ _id: check._id }, update);
        const updated = await Cart.findByIdAndUpdate(
          { _id: check._id },
          update
        );
        response = {
          code: HttpStatus.OK,
          data: updated,
          message: 'Cart updated successfully.'
        };
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
              price: book.price,
              totalPrice: totalPrice(book.price, 1)
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
            price: book.price,
            totalPrice: totalPrice(book.price, 1)
          }
        ]
      };
      const collection = await Cart.create(cart);
      response = {
        code: HttpStatus.CREATED,
        data: collection,
        message: 'Created Cart and Added to cart successfully.'
      };
    }
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Null',
      message: 'No book exist with this id.'
    };
  }

  var total = await totalAmount(userId);
  var data = {
    products: allBooks,
    totalPayable: total
  };
  var result = {
    code: response.code,
    data: data,
    message: response.message
  };
  return result;
};

/**
 *   ;
  console.log('total price: ', total);
 */

//Remove from Cart
export const remove = async (userId, bookId) => {
  var response;
  var cart = await Cart.find({ userId: userId });
  //Cart is Empty or not
  if (cart != null) {
    var check;
    cart.filter((x) => {
      if (x.books[0].productId === bookId) {
        check = x;
      } else {
        check = null;
      }
    });
    //Cart has book to remove
    if (check != null) {
      //Cart has single book then remove from cart
      if (check.books[0].quantity <= 1) {
        await Cart.findByIdAndDelete(check._id);
        response = {
          code: HttpStatus.OK,
          data: 'Book removed from cart',
          message: 'Book Removed from Cart Successfull'
        };
        //Cart has quantity more than one of a book then minus one quantity
      } else {
        console.log('I am in delete');
        const update = {
          userId: userId,
          books: [
            {
              productId: bookId,
              description: check.books[0].description,
              bookName: check.books[0].bookName,
              bookImage: check.books[0].bookImage,
              author: check.books[0].author,
              quantity: check.books[0].quantity - 1,
              price: check.books[0].price,
              totalPrice: totalPrice(
                check.books[0].price,
                check.books[0].quantity - 1
              )
            }
          ]
        };
        // await Cart.updateOne({ _id: check._id }, update);
        const updated = await Cart.findByIdAndUpdate(
          { _id: check._id },
          update
        );
        response = {
          code: HttpStatus.OK,
          data: 'Book Purchased Successfully',
          message: 'Cart updated successfully, One Quantity removed .'
        };
      }
    }
    //Book is not present in cart.
    else {
      response = {
        code: HttpStatus.BAD_REQUEST,
        data: 'Book Not Added to cart',
        message: 'Book not added to cart'
      };
    }
  }
  //Cart is not present
  else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Empty Cart',
      message: 'Cart does not exist'
    };
  }
  var total = await totalAmount(userId);
  var data = {
    products: allBooks,
    totalPayable: total
  };
  var result = {
    code: response.code,
    data: data,
    message: response.message
  };
  return result;
};

export const isPurchased = async (userId, bookId) => {
  const cart = await Cart.find({ userId: userId });
  var response;
  var check;
  if (cart != null) {
    cart.filter((x) => {
      if (x.books[0].productId === bookId) {
        check = x;
      } else {
        check = null;
      }
    });
    if (check != null) {
      if (check.isPurchased) {
        response = {
          code: HttpStatus.BAD_REQUEST,
          data: 'Book is already purchased',
          message:
            'Book is already purchased, If you want to buy again please add book to cart.'
        };
      } else {
        const book = {
          userId: userId,
          books: [
            {
              productId: bookId,
              description: check.books[0].description,
              bookName: check.books[0].bookName,
              bookImage: check.books[0].bookImage,
              author: check.books[0].author,
              quantity: check.books[0].quantity,
              price: check.books[0].price,
              totalPrice: totalPrice(
                check.books[0].price,
                check.books[0].quantity
              )
            }
          ],
          isPurchased: true
        };
        const purchased = await Cart.findByIdAndUpdate(
          { _id: check._id },
          book
        );
        response = {
          code: HttpStatus.OK,
          data: purchased,
          message: 'Book Purchased successfully.'
        };
      }
    } else {
      response = {
        code: HttpStatus.BAD_REQUEST,
        data: 'Book Not Available in cart',
        message: 'Book Not Available in cart.'
      };
    }
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Cart not available',
      message: 'Cart is not available'
    };
  }
  return response;
};

//  // const cart = {
//         //   userId: userId,
//         var books =
//         {
//           productId: bookId,
//           description: book.description,
//           bookName: book.bookName,
//           bookImage: book.bookImage,
//           author: book.author,
//           quantity: 1,
//           price: book.price,
//           totalPrice: totalPrice(book.price, 1)
//         }
//     //   ]
//     // };
//     cart[0].books.push(book);
//     // const collection = await Cart.create(cart);
//     const collection = await Cart.updateOne({userId: userId}, cart)
