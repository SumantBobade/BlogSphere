import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg"
        },
        category: {
            type: String,
            required: true,
            
        },
        slug: {
            type: String,
            required: false,
            unique: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the User model
            required: false, // This means `userId` must be provided when creating a post
            ref: 'User'
        }
    }, { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;