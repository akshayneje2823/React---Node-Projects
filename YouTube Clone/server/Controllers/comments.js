import { createError } from "../errorHandling/error.js"
import Video from "../models/Video.js";
import Comment from '../models/Comments.js'

export const addComment = async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {
        const savedComment = await newComment.save();
        res.status(200).send(savedComment);
    } catch (err) {
        next(err);
    }
}

export const getComment = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        // console.log(comments)
        res.status(200).json(comments);
    } catch (err) {
        next(err)
    }
}


export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id)

        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The comments has been deleted!")
        } else {
            return next(createError(403, "You can delete only your comment!"))
        }
    } catch (error) {
        next(error)
    }
}
