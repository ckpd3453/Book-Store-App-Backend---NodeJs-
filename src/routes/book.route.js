import express from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import * as bookController from '../controllers/book.controller';

const router = express.Router();

//To Get All Books
router.get('', userAuth, bookController.getAll);

//Get Books by ID
router.get('/:_id', userAuth, bookController.getById);

export default router;
