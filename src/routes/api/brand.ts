import express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';

// Imports Models
import Brand from '../models/Brand';

const router = express.Router();

// @Route Get api/brands
router.get('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    try {
        const brands = await Brand.find();
        res.status(200).json(brands);
    } catch {
        res.status(404).json({ message: 'No Brands were found.' });
    }
});

// @Route POST api/brands/:_id
router.put('/:_id', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    const { _id } = req.params;
    try {
        const brand = await Brand.findByIdAndUpdate(_id, req.body, { new: true });
        await brand.save();

        return res.status(201).json(brand);
    } catch {
        return res.status(404).json({ message: 'Unable to create Brand.' });
    }
});

// @Route POST api/brands
router.post('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    try {
        const brand = new Brand({ ...req.body });
        await brand.save();
        return res.status(201).json(brand);
    } catch {
        return res.status(404).json({ message: 'Unable to create Brand.' });
    }
});

export default router;
