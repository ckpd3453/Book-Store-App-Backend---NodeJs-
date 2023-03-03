import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    // console.log('Entering Authorization', bearerToken);

    // console.log(bearerToken, '-bearer Token');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };

    const user = userVerification(bearerToken);
    // res.locals.user = userVerification(bearerToken);
    // res.locals.token = bearerToken;
    req.body.userId = user.data._id;
    next();
  } catch (error) {
    next(error);
  }
};

export const userVerification = (token) => {
  const bearerToken = token.split(' ')[1];
  const user = jwt.verify(bearerToken, process.env.Jwt_Key);
  return user;
};
