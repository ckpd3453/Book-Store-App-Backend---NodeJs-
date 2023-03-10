import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as bookController from '../controllers/book.controller';

const router = express.Router();

//To Get All Books
router.get('', userAuth, bookController.getAll);

//Get Books by ID
router.get('/:_id', userAuth, bookController.getById);

router.get('/search/:search', userAuth, bookController.getBySearch);

router.get(
  '/sort/price/Ascending',
  userAuth,
  bookController.getBySortedPriceInAscending
);

router.get(
  '/sort/price/Descending',
  userAuth,
  bookController.getBySortedPriceInDescending
);

router.get(
  '/sort/arrival/Ascending',
  userAuth,
  bookController.getBySortedArrivalInAscending
);

router.get(
  '/sort/arrival/Descending',
  userAuth,
  bookController.getBySortedArrivalInDescending
);

export default router;
