import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as cartController from '../controllers/cart.controller';

const router = express.Router();

router.post('/:_id', userAuth, cartController.add);
router.delete('/:_id', userAuth, cartController.remove);

export default router;
