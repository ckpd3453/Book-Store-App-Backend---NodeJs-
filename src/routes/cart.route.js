import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as cartController from '../controllers/cart.controller';

const router = express.Router();

router.post('/:_id', userAuth, cartController.add);
router.delete('/:_id', userAuth, cartController.remove);
router.put('/:_id', userAuth, cartController.isPurchased);

export default router;
