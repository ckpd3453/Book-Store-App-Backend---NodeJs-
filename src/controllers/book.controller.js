// import HttpStatus from 'http-status-codes';
import * as bookService from '../services/book.service';

/**
 * Get All saved Notes
 * @param {Object} req
 * @param {Object} res
 */
export const getAll = async (req, res) => {
  const data = await bookService.getAll();
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 * Get Note By Id
 * @param {Object} req
 * @param {Object} res
 */
export const getById = async (req, res) => {
  const data = await bookService.getById(req.params._id);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};
