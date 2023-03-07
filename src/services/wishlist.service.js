import Book from '../models/book.model';
import WishList from '../models/wishlist.model';
import HttpStatus from 'http-status-codes';
import { response } from 'express';

export const add = async (bookId, body) => {
  var response;
  const userId = body.userId;
  var book = await Book.findById(bookId);

  //If Book is present or not
  if (book) {
    var wishlist = await WishList.find({ userId: userId });

    //If Wishlist is Present or not for a user
    //If whishlist present then throw book already added to wishlist.
    //If wishlist Not Present then create wishlist and add book
    if (wishlist[0] != null) {
      var check;
      wishlist.filter((x) => {
        if (x.books[0].productId === bookId) {
          check = x;
        } else {
          check = null;
        }
      });

      //If Book is added to wishlist or not
      //If present then update quantity else add to cart
      if (check != null) {
        response = {
          code: HttpStatus.BAD_REQUEST,
          data: check,
          message: 'Book is already added to wishlist.'
        };
      } else {
        const wishlist = {
          userId: userId,
          books: [
            {
              productId: bookId,
              description: book.description,
              bookName: book.bookName,
              bookImage: book.bookImage,
              author: book.author,
              price: book.price
            }
          ]
        };
        const collection = await WishList.create(wishlist);
        response = {
          code: HttpStatus.OK,
          data: collection,
          message: 'Added to wishlist successfully.'
        };
      }
      //   console.log(cart[0].books[0].quantity + 1);
    } else {
      const wishlist = {
        userId: userId,
        books: [
          {
            productId: bookId,
            description: book.description,
            bookName: book.bookName,
            bookImage: book.bookImage,
            author: book.author,
            price: book.price
          }
        ]
      };
      const collection = await WishList.create(wishlist);
      response = {
        code: HttpStatus.CREATED,
        data: collection,
        message: 'Created wishlist and Added to wishlist successfully.'
      };
    }
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Null',
      message: 'No book exist with this id.'
    };
  }

  return response;
};

/**
 *   ;
  console.log('total price: ', total);
 */

//Remove from Wishlist
export const remove = async (userId, bookId) => {
  var response;
  var wishlist = await WishList.find({ userId: userId });
  //Wishlist is Empty or not
  if (wishlist != null) {
    var check;
    wishlist.filter((x) => {
      if (x.books[0].productId === bookId) {
        check = x;
      } else {
        check = null;
      }
    });
    //Wishlist has book to remove
    if (check != null) {
      await WishList.findByIdAndDelete(check._id);
      response = {
        code: HttpStatus.OK,
        data: 'Removed from wishlist',
        message: 'Wishlist updated successfully .'
      };
    }
    //Book is not present in wishlist.
    else {
      response = {
        code: HttpStatus.BAD_REQUEST,
        data: 'Book Not Added to wishlist',
        message: 'Book not added to wishlist'
      };
    }
  }
  //Wishlist is not present
  else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Empty Wishlist',
      message: 'Wishlist does not exist'
    };
  }
  return response;
};
