import express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';

// Imports Models
import Post from '../models/Post';
import Profile from '../models/Profile';

// Post Validation
import validatePostInput from '../../validation/post';
import { IPost } from '../../interface/post-interface';

const router = express.Router();

// @Route POST api/posts
// @Desc Create new posts
// @Access Private route
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response) => {
        const { errors, isValid } = validatePostInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.body.user,
        });

        newPost
            .save()
            .then((post: any) => {
                res.json(post);
            })
            .catch((err: Error) => {
                res.status(404).json(err);
            });
    }
);

// @Route Get api/posts
// @Desc Gets all posts
// @Access Public route
router.get('/', (req: Request, res: Response) => {
    Post.find()
        .sort({ date: -1 })
        .then((post: any) => res.json(post))
        .catch(() =>
            res
                .status(404)
                .json({ msg: 'Sorry no posts were able to be found.' })
        );
});

// @Route Get api/posts/:id
// @Desc Get posts by id
// @Access Public route
router.get('/:id', (req: Request, res: Response) => {
    Post.findById(req.params.id)
        .sort({ date: -1 })
        .then((post: any) => res.json(post))
        .catch(() =>
            res
                .status(404)
                .json({ msg: 'Sorry no post was found matching that id.' })
        );
});

// @Route DELETE api/posts/:id
// @Desc DELETE posts by id
// @Access Private route
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response) => {
        Profile.findOne({ user: req.user.id }).then((profile) => {
            Post.findById(req.params.id).then((post) => {
                if (post.user.toString() !== req.user.id) {
                    return res.status(401).json({
                        msg:
                            'Sorry you are not authorized to delete this post.',
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
                            msg:
                                'An error occured while deleting this post please try again.',
                        });
                    });
            });
        });
    }
);

// @Route POST api/posts/like/:id
// @Desc POST New post like
// @Access Private route
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response) => {
        Profile.findOne({ user: req.user.id }).then((profile) => {
            Post.findById(req.params.id)
                .then((post) => {
                    if (
                        post.likes.filter(
                            (like) => like.user.toString() === req.user.id
                        ).length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ msg: 'You have already liked this post.' });
                    }

                    post.likes.unshift({ user: req.user.id });
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
    }
);

// @Route POST api/posts/unlike/:id
// @Desc POST Unlike a post
// @Access Private route
router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response) => {
        Profile.findOne({ user: req.user.id }).then((profile) => {
            Post.findById(req.params.id)
                .then((post) => {
                    if (
                        post.likes.filter(
                            (like) => like.user.toString() === req.user.id
                        ).length === 0
                    ) {
                        return res.status(400).json({
                            msg: 'You have have not like this post yet.',
                        });
                    }

                    // Removes Like if already liked
                    const unlikeIndex = post.likes
                        .map((item) => item.user.toString())
                        .indexOf(req.user.id);
                    post.likes.splice(unlikeIndex, 1);

                    post.save()
                        .then((post) => {
                            res.json(post);
                        })
                        .catch(() => {
                            res.status(404).json({
                                msg:
                                    'Sorry, an error occured while unliking this post.',
                            });
                        });
                })
                .catch(() => {
                    res.status(404).json({
                        msg:
                            'Sorry, an error occured while unliking this post.',
                    });
                });
        });
    }
);

// @Route POST api/posts/comment/:id
// @Desc POST Add comment to post
// @Access Private route
router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response) => {
        const { errors, isValid } = validatePostInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        Post.findById(req.params.id).then((post) => {
            const newComment = {
                _id: req.body._id,
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id,
                date: req.user.date,
            };

            // Add to comments array
            post.comments.unshift(newComment);

            // Saves Post to MongoDB
            post.save()
                .then((post) => {
                    res.json(post);
                })
                .catch(() => {
                    res.status(404).json({ msg: 'No post was found' });
                });
        });
    }
);

// @Route DELETE api/posts/comment/:id/:comment_id
// @Desc Remove comment from posts
// @Access Private route

router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then((post) => {
                // Check to see if comment exists
                if (
                    post.comments.filter(
                        (comment) =>
                            comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ msg: 'No comment was found for this post.' });
                }

                // Get remove index
                const removeIndex = post.comments
                    .map((item) => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice comment out of array
                post.comments.splice(removeIndex, 1);

                post.save().then((post) => res.json(post));
            })
            .catch(() =>
                res
                    .status(404)
                    .json({ msg: 'No post was found for this comment.' })
            );
    }
);

export default router;
