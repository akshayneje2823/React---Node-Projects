import express from 'express';
import { verifyToken } from '../verifyToken.js';
import {addComment,getComment,deleteComment} from '../Controllers/comments.js'

const router = express.Router()

router.post('/', verifyToken, addComment)

router.get('/:videoId', verifyToken, getComment)

router.delete('/:id', verifyToken, deleteComment)


export default router