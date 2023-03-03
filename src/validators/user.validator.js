import Joi from '@hapi/joi';
import { joiPasswordExtendCore } from 'joi-password';
import HttpStatus from 'http-status-codes';

const joiPassword = Joi.extend(joiPasswordExtendCore);
export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .regex(/^[A-Z]{1,1}[a-z]{2,30}$/)
      .required(),
    lastName: Joi.string()
      .regex(/^[A-z]{1,1}[a-z]{2,30}$/)
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    }),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
    resetPassword: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    console.log(error.details[0].type);
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: error.details[0].type,
      message: error.message
    });
    console.log(error.message);
  } else {
    next();
  }
};
