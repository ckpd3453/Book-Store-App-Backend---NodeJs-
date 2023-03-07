import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as buyerDetailsController from '../controllers/buyerDetails.controller';

const router = express.Router();

//To Add UserDetails
router.post('', userAuth, buyerDetailsController.add);

export default router;
