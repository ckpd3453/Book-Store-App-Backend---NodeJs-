import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as wishlistController from '../controllers/wishlist.controller';

const router = express.Router();

router.post('/:_id', userAuth, wishlistController.add);
router.delete('/:_id', userAuth, wishlistController.remove);

export default router;
