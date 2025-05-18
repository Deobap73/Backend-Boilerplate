// backend-boilerplate/src/api/bookmark/routes/bookmark.routes.ts
import { Router } from 'express';
import { protect } from '../../../middlewares/protect';
import { getBookmarks, addBookmark, removeBookmark } from '../controllers/bookmark.controller';
import { validate } from '../../../middlewares/validate';
import { addBookmarkValidator } from '../validators/bookmark.validator';

const router = Router();

/**
 * @swagger
 * /api/bookmarks:
 *   get:
 *     summary: Get all bookmarks of the authenticated user
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookmarks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bookmark'
 *   post:
 *     summary: Add a new bookmark
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *             properties:
 *               postId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bookmark created
 *       400:
 *         description: Validation error
 *
 * /api/bookmarks/{id}:
 *   delete:
 *     summary: Remove a bookmark by ID
 *     tags: [Bookmarks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bookmark removed
 *       404:
 *         description: Bookmark not found
 */
router.use(protect);

router.get('/', getBookmarks);
router.post('/', addBookmarkValidator, validate, addBookmark);
router.delete('/:id', removeBookmark);

export default router;
