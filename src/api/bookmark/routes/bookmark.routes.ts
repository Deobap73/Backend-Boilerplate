// backend-boilerplate/src/api/bookmark/routes/bookmark.routes.ts
import { Router } from 'express';
import { protect } from '../../../middlewares/protect';
import { getBookmarks, addBookmark, removeBookmark } from '../controllers/bookmark.controller';
import { validate } from '../../../middlewares/validate';
import { addBookmarkValidator } from '../validators/bookmark.validator';

const router = Router();

router.use(protect);

router.get('/', getBookmarks);
router.post('/', addBookmarkValidator, validate, addBookmark);
router.delete('/:id', removeBookmark);

export default router;
