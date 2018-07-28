import express from "express";
import { Request, Response } from "express";
const router = express.Router();

// @Route GET api/users/test
// @Desc Test users route
// @Access Public route
router.get('/test', (req: Request, res: Response) => res.json({msg: 'User works'}));

export default router;
