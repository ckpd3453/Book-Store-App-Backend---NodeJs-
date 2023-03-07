import * as buyerDetailsService from '../services/buyerDetails.service';

export const add = async (req, res) => {
  const data = await buyerDetailsService.add(req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

export const update = async (req, res) => {
  const data = await buyerDetailsService.update(req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};
