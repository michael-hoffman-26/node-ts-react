import express from 'express';

import itemRouter from './item';
import healthRouter from './health';


const router = express.Router();

router.use("/item", itemRouter);
router.use('/health', healthRouter);

export default router;