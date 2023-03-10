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

/**
 * Get item by search
 * @param {object} req
 * @param {object} res
 */
export const getBySearch = async (req, res) => {
  console.log('I am in controller');
  const data = await bookService.getBySearch(req.params.search);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 * Get in sorted form
 * @param {object} req
 * @param {object} res
 */
export const getBySortedPriceInAscending = async (req, res) => {
  console.log('I am in controller');
  const data = await bookService.getBySortedPriceInAscending();
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 * Get in sorted form
 * @param {object} req
 * @param {object} res
 */
export const getBySortedPriceInDescending = async (req, res) => {
  console.log('I am in controller');
  const data = await bookService.getBySortedPriceInDescending();
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 *
 * @param {object} req
 * @param {object} res
 */
export const getBySortedArrivalInAscending = async (req, res) => {
  console.log('I am in controller');
  const data = await bookService.getBySortedArrivalInAscending();
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 *
 * @param {object} req
 * @param {object} res
 */
export const getBySortedArrivalInDescending = async (req, res) => {
  console.log('I am in controller');
  const data = await bookService.getBySortedArrivalInDescending();
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};
