import Book from '../models/book.model';
import HttpStatus from 'http-status-codes';

//To Get all books
export const getAll = async () => {
  var response;
  const data = await Book.find();
  if (data != null) {
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Data retrieved Successfully.'
    };
  } else {
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Empty Stack'
    };
  }
  return response;
};

//To Get Book By Id
export const getById = async (bookId) => {
  var response;
  const data = await Book.find({ _id: bookId });
  if (data[0] != null) {
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Note Retrived successfully'
    };
  } else {
    response = {
      code: HttpStatus.NOT_FOUND,
      data: null,
      message: 'Invalid Note Id'
    };
  }
  return response;
};
