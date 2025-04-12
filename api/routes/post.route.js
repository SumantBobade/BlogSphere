import express from 'express';
import Post from '../models/post.model.js'; // Make sure your Post model is correctly defined
import slugify from 'slugify';
import { getposts } from '../controllers/post.controller.js';

const router = express.Router();
const generateUniqueSlug = async (title) => {
    let slug = slugify(title, { lower: true, strict: true });
    const existingPost = await Post.findOne({ slug });
    let counter = 1;

    // Modify the slug if it already exists
    while (existingPost) {
        slug = `${slugify(title, { lower: true, strict: true })}-${counter}`;
        counter++;
        existingPost = await Post.findOne({ slug });
    }

    return slug;
};

// Create a new post
router.post('/create', async (req, res) => {
    try {
        // Create a new post without an image
        const newPost = new Post({
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
            userId: req.body.userId,
    slug: await generateUniqueSlug(req.body.title)
            // Removed image_file from Post creation
        });
        
        await newPost.save();
        res.status(201).json({ success: true, message: 'Post created successfully', post: newPost });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error while creating post' });
    }
});

// Additional route to fetch all posts (optional)
router.get('/getposts', getposts);

// Additional route to get specific post by ID (optional)
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error while fetching post' });
    }
});



export default router;