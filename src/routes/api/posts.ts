import express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';

// Imports Models
import Post from '../models/Post';
import Profile from '../models/Profile';

// Post Validation
import validatePostInput from '../../validation/post';

const router = express.Router();

// @Route POST api/posts
// @Desc Create new posts
// @Access Private route
router.post('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    const { errors, isValid } = validatePostInput(req.body);

    isValid ? null : () => res.status(400).json(errors);

    try {
        const post = new Post({ ...req.body });
        await post.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(404).json(err);
    }
});

// @Route Get api/posts
// @Desc Gets all posts
// @Access Public route
router.get('/', async (req: Request, res: Response) => {
    try {
        const post = await Post.find().sort({ date: -1 });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(404).json({ msg: 'Sorry no posts were found.' });
    }
});

// @Route Get api/posts/:id
// @Desc Get posts by id
// @Access Public route
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id).sort({ date: -1 });
        return res.status(200).json(post);
    } catch (err) {
        return res.status(404).json({ msg: 'Sorry no post was found for that id.' });
    }
});

// @Route DELETE api/posts/:id
// @Desc DELETE posts by id
// @Access Private route
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    const { id } = req.params;

    Profile.findOne({ id }).then((profile) => {
        Post.findById(req.params.id).then((post) => {
            if (post.user.toString() !== id) {
                return res.status(401).json({
                    msg: 'Sorry you are not authorized to delete this post.',
                });
            }

            post.remove()
                .then(() => {
                    res.json({
                        msg: 'Your post has successfully been deleted.',
                    });
                })
                .catch(() => {
                    res.status(404).json({
                        msg: 'An error occured while deleting this post please try again.',
                    });
                });
        });
    });
});

// @Route POST api/posts/like/:id
// @Desc POST New post like
// @Access Private route
router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    const { id } = req.params;

    Profile.findOne({ id }).then((profile) => {
        Post.findById(id)
            .then((post) => {
                if (post.likes.filter((like) => like.user.toString() === id).length > 0) {
                    return res.status(400).json({ msg: 'You have already liked this post.' });
                }

                post.likes.unshift({ user: id });
                post.save().then((post) => {
                    res.json(post);
                });
            })
            .catch(() => {
                res.status(404).json({
                    msg: 'Sorry, an error occured while liking this post.',
                });
            });
    });
});

// @Route POST api/posts/unlike/:id
// @Desc POST Unlike a post
// @Access Private route
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    const { id } = req.params;

    Profile.findOne({ id }).then((profile) => {
        Post.findById(id)
            .then((post) => {
                if (post.likes.filter((like) => like.user.toString() === id).length === 0) {
                    return res.status(400).json({
                        msg: 'You have have not like this post yet.',
                    });
                }

                // Removes Like if already liked
                const unlikeIndex = post.likes.map((item) => item.user.toString()).indexOf(id);
                post.likes.splice(unlikeIndex, 1);

                post.save()
                    .then((post) => {
                        res.json(post);
                    })
                    .catch(() => {
                        res.status(404).json({
                            msg: 'Sorry, an error occured while unliking this post.',
                        });
                    });
            })
            .catch(() => {
                res.status(404).json({
                    msg: 'Sorry, an error occured while unliking this post.',
                });
            });
    });
});

// @Route POST api/posts/comment/:id
// @Desc POST Add comment to post
// @Access Private route
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    const { errors, isValid } = validatePostInput(req.body);

    isValid ? null : () => res.status(400).json(errors);

    const { _id, text, name, avatar } = req.body;

    const newComment = {
        _id,
        text,
        name,
        avatar,
        user: '',
        date: new Date(),
    };

    try {
        const post = await Post.findById(req.params.id);
        post.comments.unshift(newComment);

        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ msg: 'Sorry, there were no post found for this user.' });
    }
});

// @Route DELETE api/posts/comment/:id/:comment_id
// @Desc Remove comment from posts
// @Access Private route
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            // Check to see if comment exists
            if (post.comments.filter((comment) => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ msg: 'No comment was found for this post.' });
            }

            // Get remove index
            const removeIndex = post.comments.map((item) => item._id.toString()).indexOf(req.params.comment_id);

            // Splice comment out of array
            post.comments.splice(removeIndex, 1);

            post.save().then((post) => res.json(post));
        })
        .catch(() => res.status(404).json({ msg: 'No post was found for this comment.' }));
});

export default router;
