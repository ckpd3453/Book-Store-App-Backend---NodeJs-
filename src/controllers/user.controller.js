// import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res) => {
  const data = await UserService.newUser(req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

/**
 * Controller for user login
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const login = async (req, res) => {
  const data = await UserService.login(req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

export const forgetPassword = async (req, res) => {
  const data = await UserService.forgetPassword(req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

export const resetPassword = async (req, res) => {
  const data = await UserService.resetPassword(req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};
