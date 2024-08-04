import express from 'express';
import { Router } from 'express';
const router = Router();

import { products } from './products.router.js'; 

router.get('/', (req, res) => {
    res.render('index', { productos: products });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { productos: products });
});

export default router;
