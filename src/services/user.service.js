import User from '../models/user.model';
import HttpStatus from 'http-status-codes';
import * as bcrypt from '../middlewares/bcrypt.middleware';
import * as jwt from '../middlewares/jwt.middleware';

const nodemailer = require('nodemailer');
const sendVerificationMail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password
    }
  });
  const mailConfigurations = {
    from: 'chandrakantprasad573@gmail.com',

    to: email,

    subject: 'For Email Verification',

    text: `Hi! There, You have recently visited our website and entered your email.
   
             Requested OTP : - ${token} 
         
             Thanks`
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log('Email Sent Successfully to', info.envelope.to[0]);
  });
};

//User Check Function
async function userCheck(body) {
  return await User.findOne({ email: body.email });
}

//create new user
export const newUser = async (body) => {
  var response;

  const check = await userCheck(body);
  if (check == null) {
    const registration = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: await bcrypt.securePassword(body.password)
    };
    const data = await User.create(registration);
    response = {
      code: HttpStatus.CREATED,
      data: data,
      message: 'User is Registered Successfully'
    };
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'User is Already Registered',
      message: 'User is Already Registered'
    };
  }
  return response;
};

//Login
export const login = async (body) => {
  var response;

  const user = await userCheck(body);
  if (user == null) {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: 'Login Failed',
      message: 'Invalid User Name'
    };
  } else {
    const savedPassword = user.password;
    const passwordCheck = await bcrypt.match(body.password, savedPassword);
    if (passwordCheck) {
      var token = jwt.jwtToken(user);
      const responseData = {
        user: user,
        Auth: token
      };
      response = {
        code: HttpStatus.OK,
        data: responseData,
        message: 'Log in Successful'
      };
    } else {
      response = {
        code: HttpStatus.BAD_REQUEST,
        data: 'Login Failed',
        message: 'Invalid User Password'
      };
    }
  }
  return response;
};

export const forgetPassword = async (body) => {
  var response;
  const user = await userCheck(body);
  if (user == null) {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: `${body.email} is not registered. `,
      message: 'Pease register your email id.'
    };
  } else {
    var token = jwt.jwtToken(user);
    sendVerificationMail(body.email, token);
    response = {
      code: HttpStatus.OK,
      data: `Link Sent`,
      message: 'link sent to your verification mail'
    };
  }
  return response;
};

export const resetPassword = async (body) => {
  var response;
  console.log(body);
  if (body.resetPassword !== null) {
    const user = await User.findById(body.userId);
    const update = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: await bcrypt.securePassword(body.resetPassword)
    };

    const data = await User.findByIdAndUpdate(body.userId, update, {
      new: true
    });
    response = {
      code: HttpStatus.OK,
      data: data,
      message: 'Password reset successful.'
    };
  } else {
    response = {
      code: HttpStatus.BAD_REQUEST,
      data: null,
      message: 'Please enter password to reset'
    };
  }
  return response;
};
