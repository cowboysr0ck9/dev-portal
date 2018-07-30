import express from "express";
import { Request, Response } from "express";
const router = express.Router();


// @Route GET api/posts/test
// @Desc Test posts route
// @Access Public route
router.get('/test', (req: Request, res: Response) => res.json({ msg: 'Posts works' }));



export default router;
