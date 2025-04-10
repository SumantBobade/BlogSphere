import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req, resizeBy, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'))
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400,'Please provide all required fields'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase.replace(/[^a-zA-Z0-9-]/g, '-');
    const newPost = new Post({
        ...req.body, slag, userId: req.user.id,
    });
    try {
        const savedPost = await
            resizeBy.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
}

// Retrieve all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};