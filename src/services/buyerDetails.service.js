import BuyerDetails from '../models/buyerDetail.model';
import HttpStatus from 'http-status-codes';

export const add = async (body) => {
  var check = await BuyerDetails.find({ userId: body.userId });
  var details;
  var res;
  if (check[0] != null) {
    check[0].details.push(body.details[0]);
    details = await BuyerDetails.updateOne({ userId: body.userId }, check[0]);
    res = {
      code: HttpStatus.OK,
      data: 'Saved',
      message: 'Details Updated Successfully'
    };
  } else {
    console.log('Creating');
    var buyerDetail = {
      userId: body.userId,
      details: [
        {
          name: body.details[0].name,
          phone: body.details[0].phone,
          pincode: body.details[0].pincode,
          address: body.details[0].address,
          city: body.details[0].city,
          state: body.details[0].state,
          landmark: body.details[0].landmark
        }
      ]
    };
    details = await BuyerDetails.create(buyerDetail);
    res = {
      code: HttpStatus.OK,
      data: 'Saved',
      message: 'Details Saved Successfully'
    };
  }

  return res;
};
