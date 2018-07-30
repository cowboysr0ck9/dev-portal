import express from "express";
import { Request, Response } from "express";
const router = express.Router();


// @Route GET api/profile/test
// @Desc Test profile route
// @Access Public route
router.get('/test', (req: Request, res: Response) => res.json({ msg: 'Profile works' }));



export default router;
