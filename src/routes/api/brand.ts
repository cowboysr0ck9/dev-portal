import express from 'express';
import { Request, Response } from 'express';
import passport from 'passport';

import PDFDocument from 'pdfkit';
import xlsx from 'xlsx';

// Imports Models
import Brand from '../models/Brand';

const router = express.Router();

// @Route Get api/brands
router.get('/', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
    try {
        const brands = await Brand.find().limit(10);
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

// @Route GET api/brands/pdf
router.get('/pdf', async (req: Request, res: Response) => {
    try {
        const pdf = new PDFDocument();
        const file = encodeURIComponent('TestFileName') + '.pdf';

        res.setHeader('Content-disposition', 'attachment; filename="' + file + '"');
        res.setHeader('Content-type', 'application/pdf');

        pdf.y = 300;
        pdf.text('Test', 50, 50);
        pdf.pipe(res);
        pdf.end();
    } catch {
        return res.status(404).json({ message: 'Unable to create PDF.' });
    }
});

// @Route GET api/brands/pdf
router.get('/csv', async (req: Request, res: Response) => {
    try {
        const data = [['id', 'name', 'debits', 'credits']];
        const ws = xlsx.utils.aoa_to_sheet(data);
        const wb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(wb, ws, 'SheetJS');

        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xls' });

        res.status(200).send(buffer);
    } catch {
        return res.status(404).json({ message: 'Unable to create PDF.' });
    }
});

export default router;
