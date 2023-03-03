import * as cartService from '../services/cart.service';

export const add = async (req, res) => {
  const data = await cartService.add(req.params._id, req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};
