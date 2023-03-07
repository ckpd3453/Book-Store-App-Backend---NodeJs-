import * as wishlist from '../services/wishlist.service';

export const add = async (req, res) => {
  const data = await wishlist.add(req.params._id, req.body);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};

export const remove = async (req, res) => {
  const data = await wishlist.remove(req.body.userId, req.params._id);
  res.status(data.code).json({
    code: data.code,
    data: data.data,
    message: data.message
  });
};
