import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as cartController from '../controllers/cart.controller';

const router = express.Router();

router.post('/:_id', userAuth, cartController.add);

export default router;
