import express from 'express';
import {getAllBooks,getBookById,addBook} from '../controllers/bookController.js';

const router = express.Router();
router.get('/',getAllBooks); // path to method mapping
router.get('/:id',getBookById);
router.post('/',addBook);

export default router;